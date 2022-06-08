<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\event;

class schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id', 'recurring_date',
    ];

    public function events()
    {
        return $this->belongsTo(event::class,'event_id','id');
    }
}
