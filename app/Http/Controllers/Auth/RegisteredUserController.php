<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Register\RegisterUserRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {        
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterUserRequest $request): RedirectResponse
    {         
        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        //     'password' => ['required', 'confirmed', Rules\Password::defaults()],
        // ]);

        $user = User::create([
            'name' => $request->validated('name'),
            'last_name' => $request->validated('last_name'),
            'user_name' => $request->validated('user_name'),
            'sucursal' => $request->validated('sucursal'),
            'active' => true,
            'role' => 'lector',
            // 'email' => $request->email,
            'password' => Hash::make($request->validated('password')),
        ]);

        event(new Registered($user));

        Auth::login(user: $user);

        return redirect()->route('dashboard')->with('success', 'Cuenta creada correctamente');

        // return redirect()->intended(route('dashboard', absolute: false))->with('success');
    }
}
