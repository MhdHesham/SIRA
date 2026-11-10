<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        return Course::query()
            ->where('status', 'published')
            ->where('institute_id', $request->user()->institute_id)
            ->with('instructor:id,name')
            ->latest()
            ->paginate(12);
    }

    public function show(Course $course)
    {
        return response()->json($course->load('instructor:id,name'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'description' => ['nullable', 'string'],
            'delivery_mode' => ['required', 'in:online,onsite,hybrid'],
            'capacity' => ['nullable', 'integer', 'min:1'],
            'status' => ['sometimes', 'in:draft,published,archived'],
        ]);

        $course = Course::create($data + [
            'institute_id' => $request->user()->institute_id,
            'slug' => str()->slug($data['title']),
        ]);

        return response()->json($course, 201);
    }
}
