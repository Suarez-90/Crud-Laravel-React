<?php
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return redirect('/login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('dashboard', [PostController::class, 'index'])->name('dashboard');
    
    Route::middleware('role_gestion_clients')->group(function (){
        Route::prefix('gestion')->name('gestion.')->group(function(){
            Route::get('/clientes',[PostController::class, 'indexList'])->name('post.index');
            Route::post('/clientes',[PostController::class, 'store'])->name('post.store');
            Route::put('/clientes/{post}',[PostController::class, 'update'])->name('post.update');
            Route::delete('/clientes/post/{post}',[PostController::class, 'destroy'])->name('post.destroy');
            // Route::delete('/clientes/post{post}/comments/{comment}',[PostController::class, 'destroyComment'])->name('postcomment.destroy');
    
            Route::resource('comments', CommentsController::class)->except(['show', 'edit']);
        });
    });

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
