<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
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
            // 'nro_c' => ['required', 'integer', 'min:1', 'unique:posts,nro_contract'],
            // 'name_c' => ['required', 'string', 'max:25', 'unique:posts,name_p'],
            // 'fecha_c' => ['nullable'],
            // 'workers.*.name_w' => ['required', 'string', 'max:25', 'unique:comments,name_c'],
            // 'workers.*.ci_w' => ['required', 'integer', 'min_digits:11', 'unique:comments,nro_ident'],
            "nro_c"  => 'required|integer|min:1|unique:posts,nro_contract',
            "name_c"  => 'required|string|max:30|unique:posts,name_p',
            "fecha_c" => 'nullable',
            "workers" => 'nullable|array',
            'workers.*.name_w'=> 'required|string|max:25|unique:comments,name_c',
            'workers.*.ci_w'=> 'required|string|max:11|unique:comments,nro_ident',

        ];
    }


    public function messages():array {
        return [
            'nro_c.required' => 'Este campo es requerido',
            'nro_c.integer'  => 'Introduca solo numeros enteros',
            'nro_c.min'      => 'EL menor numero a introducir es 1',
            'nro_c.unique'      => 'Este Contrato ya existe',
            'name_c.required'=> 'Este campo es requerido',
            'name_c.string'  => 'El nombre del Contrato debe ser un string',
            'name_c.max'      => 'El nombre exceder los 30 characters',
            'name_c.unique'      => 'Este Cliente ya existe',           
            'workers.*.name_w.required' => 'Este campo es requerido',
            'workers.*.name_w.string' => 'El nombre debe ser un String',
            'workers.*.name_w.max' => 'El nombre no debe exceder los 25 characters',
            'workers.*.name_w.unique' => 'Este nombre ya existe',
            'workers.*.ci_w.required' => 'Campo requerido',
            'workers.*.ci_w.string' => 'Campo de solo string',
            'workers.*.ci_w.max' => 'El campo deber tener 11 digitos',
            'workers.*.ci_w.unique' => 'Este Nro. ya existe',

        ];
    }

    public function attributes(){
        return [
            'workers.*.name_w' => 'nombre del trabajador',
            'workers.*.ci_w' => 'identidad del trabajador'
        ];
    }
}
