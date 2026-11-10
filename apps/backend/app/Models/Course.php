<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['institute_id', 'instructor_id', 'title', 'slug', 'description', 'delivery_mode', 'capacity', 'starts_at', 'ends_at', 'status'];

    protected $casts = ['starts_at' => 'datetime', 'ends_at' => 'datetime'];

    public function institute()
    {
        return $this->belongsTo(Institute::class);
    }

    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }
}
