<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\schedule;

class event extends Model
{
    use HasFactory;

    protected $fillable = [
       'user_id', 'name', 'start_time', 'end_time', 'day_of_week', 'description',
    ];
}
