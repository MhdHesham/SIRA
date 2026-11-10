<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LearningPath;

class LearningPathController extends Controller
{
    public function show(Request $request)
    {
        return response()->json(LearningPath::where('trainee_id', $request->user()->id)->latest('generated_at')->firstOrFail());
    }
}
