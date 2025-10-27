<?php

namespace App\Http\Requests\Register;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'user_name' => 'required|lowercase|string|max:50|unique:users,user_name',
            'sucursal' => 'nullable|string|max:255|',
            // 'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'min:8', 'confirmed', Rules\Password::defaults()],
            'password_confirmation' => 'required'
            
        ];
    }
    public function messages():array {
        return [
            'name.required' => 'Nombre es requerido',
            'name.max'  => 'Campo de máximo 255 character',
            'last_name.required' => 'Los apellidos son requerido',
            'last_name.max'  => 'Campo de máximo 255 character',
            'user_name.required' => 'El usuario es requerido',
            'user_name.max'  => 'El usuario debe tener máximo 50 letras',
            'user_name.lowercase' => 'El usuario debe ser en menúsculas',
            'user_name.unique'  => 'Este usuario ya existe',            
            'password.confirmed' => 'Las constraseña no coinciden ',
            'password.min'=> 'La contraseña debe ser mayor o igual a 8 character',
            'password.required'=> 'El password es requerido',
            'password_confirmation.required' => 'Campo requerido'
            
            

        ];
    }
}
