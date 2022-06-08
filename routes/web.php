<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Auth::routes();
Route::get('/',function(){
        return redirect('login');
    })->middleware('guest');

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/get_event', [App\Http\Controllers\HomeController::class, 'get_event'])->name('get_event');
Route::post('/add_event', [App\Http\Controllers\HomeController::class, 'add_event'])->name('add_event');
