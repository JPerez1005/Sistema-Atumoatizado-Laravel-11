<?php

// use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/vue', function () {
    return view('vue');
});

// Route::middleware(['web'])->group(function () {
//     Route::post('/api/user/login', [UserController::class, 'login']);
// });