<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\event;
use App\Models\schedule;
use Carbon;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }
    public function get_event()
    {
        $user = auth()->user();
        $events = schedule::whereHas('events',function($q) use($user){
            $q->where('user_id',$user->id);
        })->pluck('recurring_date')->toArray();
        $events = array_map('json_decode', $events);
        $event_list = [0=>array_merge(... $events)];
    
        return response()->json(['status'=>true,'events'=>$event_list]);
    }
    public function add_event(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'start_time' => 'required',
            'end_time' => 'required',
            'description' => 'required',
            'day_of_week' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>false,'message'=>$validator->messages()->first()]);
        }else{
            try{
                $event = new event();
                $event->user_id = auth()->user()->id;
                $event->name = $request->name;
                $event->start_time = $request->start_time;
                $event->end_time = $request->end_time;
                $event->description = $request->description;
                $event->day_of_week = json_encode($request->day_of_week);
                $event->save();

                //create recurring schedule
                $recurring_schedule = [];
                $fromDate = Carbon::now();
                $toDate = Carbon::now()->addDays(90);
                $days = $request->day_of_week;
                $diff = Carbon::parse($event->start_time)->diffInDays(Carbon::parse($event->end_time));
                $recurring_schedule[] = ['start'=>$event->start_time,'end'=>$event->end_time,'title'=>$event->name,'description'=>$event->description];
                foreach ($days as $key => $value) {
                    $startDate = Carbon::parse($fromDate)->next($value);
                    for ($date = $startDate; $date->lte($toDate); $date->addWeek()) {
                        $start = $date->format('Y-m-d').'T'.Carbon::parse($request->start_time)->format('H:i');
                        $end = $date->format('Y-m-d').'T'.Carbon::parse($request->end_time)->format('H:i');
                        $recurring_schedule[] = ['start'=>$start,
                                                  'end'=> $end,
                                                   'title'=>$event->name,
                                                   'description'=>$event->description
                                                ];
                    }
                }
                $schedule = new schedule();
                $schedule->event_id = $event->id;
                $schedule->recurring_date = json_encode($recurring_schedule);
                $schedule->save();

                //get new event list
                $user = auth()->user();
                $events = schedule::whereHas('events',function($q) use($user){
                    $q->where('user_id',$user->id);
                })->pluck('recurring_date')->toArray();
                $events = array_map('json_decode', $events);
                $event_list = [0=>array_merge(... $events)];

                return response()->json(['status'=>true,'message'=>'Event scheduled successful','events'=>$event_list]);
            }catch(\Illuminate\Database\QueryException $ex){
                return response()->json(['status'=>false,'message'=>$ex->getMessage()]);
            }
        }
    }
}
