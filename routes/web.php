<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::get('/', function () {
//     return Inertia::render('dashboard');
// })->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');
    Route::get('dashboard', [PostController::class, 'index'])->name('dashboard');
    // Route::get('admin/clientes',[PostController::class, 'indexList'])->name('post.index');
    Route::prefix('admin')->name('admin.')->group(function(){
        Route::get('/clientes',[PostController::class, 'indexList'])->name('post.index');
        Route::post('/clientes',[PostController::class, 'store'])->name('post.store');
        Route::put('/clientes/{post}',[PostController::class, 'update'])->name('post.update');
        Route::delete('/clientes/{post}',[PostController::class, 'destroy'])->name('post.destroy');

        Route::resource('comments', CommentsController::class)->except(['show', 'edit']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
