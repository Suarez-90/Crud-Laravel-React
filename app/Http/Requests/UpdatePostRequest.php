<?php

namespace App\Http\Requests;

use App\Models\Comments;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePostRequest extends FormRequest
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
        // dd($this->route());
        // $isUpdate = $this->route('post') ? true : false;
        $postId = $this->route('post')?->id;
        
        return [
            'nro_c' => [
                'required',
                'integer',
                'min:1',
                Rule::unique('posts', 'nro_contract')->ignore($postId),
            ],
            'name_c' => [
                'required',
                'string',
                'max:100',
                Rule::unique('posts','name_p')->ignore($postId),
            ],
            'fecha_c' => ['nullable'],
            'workers'=>['required', 'array'],
            'workers.*.id'=>['nullable', 'exists:comments,id'],
            'workers.*.name_w' => [
                'required',
                'string',
                'max:100',
            ],
            'workers.*.ci_w' => [
                'required',
                'string',
                'max:11',                
            ],
            // "nro_c"  => 'required|integer|min:1|unique:posts,nro_contract,'. $postId,
            // "name_c"  => `required|string|max:30|unique:posts,name_p,$postId`,
            // "fecha_c" => 'nullable',
            // "workers" => 'nullable|array',
            // 'workers.*.name_w'=> 'required|string|max:25|exists:column,name_c',
            // 'workers.*.ci_w'=> 'required|integer|min_digits:11|unique:comments,nro_ident',

        ];
    }
    public function withValidator($validator){
        $validator->after(function ($validator){

            $comments_name = collect($this->input('workers', []))
                ->filter(fn($p)=>!empty($p['name_w']));
            $comments_nro_ident = collect($this->input('workers', []))
                ->filter(fn($p)=>!empty($p['ci_w']));

            /***Validar Nombres Duplicados dentro del mismo formulario */
            $duplicates_name = $comments_name->groupBy(fn($c)=>strtolower(trim($c['name_w'])))
                ->filter(fn($group)=> $group->count() > 1)->keys();
            
            foreach ($duplicates_name as $duplicateName_W) {
                foreach ($comments_name as $index => $comment) {
                    if (strtolower(trim($comment['name_w']))===$duplicateName_W){
                        $validator->errors()->add(
                          "workers.$index.name_w",
                          "Este nombre está duplicado en el formulario "  
                        //   "El Nombre \"$duplicateName_W\" está duplicado en el formulario "  
                        );
                    }
                }
            }
            /***Validar Nro_Ident Duplicados dentro del mismo formulario */
            $duplicates_ci = $comments_nro_ident->groupBy(fn($c)=>strtolower(trim(strval($c['ci_w']))))
                ->filter(fn($group)=> $group->count() > 1)->keys();
            
            foreach ($duplicates_ci as $duplicateCi_W) {
                foreach ($comments_name as $index => $comment) {
                    // dd($comment['ci_w'], strval($duplicateCi_W));
                    if (strtolower(trim(strval($comment['ci_w'])))===strval($duplicateCi_W)){
                        $validator->errors()->add(
                          "workers.$index.ci_w",
                          "Nro duplicado en el formulario"  
                        //   "El Nombre \"$duplicateName_W\" está duplicado en el formulario "  
                        );
                    }
                }
            }
            /***Validar Name unicidad global en toda la aplicacion */
            foreach ($comments_name as $index => $commt) {
                $name = trim($commt['name_w']);
                if (!$name) continue;

                $query = Comments::where('name_c', $name);
                
                if($this->route('post')){
                    $query->where('post_id', '!=', $this->route('post')->id);
                }
                if($query->exists()){
                    $validator->errors()->add(
                        "workers.$index.name_w",
                        "Este nombre ya existe en otro Cliente"
                        // "El Nombre \"$name\" ya existe en otro Cliente"
                    );
                }
            }
            /***Validar Nro_Ident unicidad global en toda la aplicacion */
            foreach ($comments_nro_ident as $index => $commt) {
                $name = trim(strval($commt['ci_w']));
                if (!$name) continue;

                $query = Comments::where('nro_ident', $name);
                
                if($this->route('post')){
                    $query->where('post_id', '!=', $this->route('post')->id);
                }
                if($query->exists()){
                    $validator->errors()->add(
                        "workers.$index.ci_w",
                        "Nro existente en otro Cliente"
                        // "El Nombre \"$name\" ya existe en otro Cliente"
                    );
                }
            }
        });
    }

    public function messages():array {
        return [
            'nro_c.required' => 'Este campo es requerido',
            'nro_c.integer'  => 'Introduca solo numeros enteros',
            'nro_c.min'      => 'EL menor numero a introducir es 1',
            'nro_c.unique'      => 'Nro Contrato existente',
            'name_c.required'=> 'Este campo es requerido',
            'name_c.string'  => 'El nombre del Contrato debe ser un string',
            'name_c.max'      => 'El nombre exceder los 30 characters',
            'name_c.unique'      => 'Nombre del Cliente existente',
            'workers.*.name_w.required' => 'Este campo es requerido',
            'workers.*.name_w.max' => 'El nombre no debe exceder los 50 characters',
            'workers.*.ci_w.required' => 'Este campo es requerido',
            // 'workers.*.ci_w.string' => 'Campo de solo string',
            'workers.*.ci_w.max_digits' => 'Campo de 11 digitos',

        ];
    }

    public function attributes(){
        return [
            'workers.*.name_w' => 'nombre del trabajador',
            'workers.*.ci_w' => 'identidad del trabajador'
        ];
    }
}
