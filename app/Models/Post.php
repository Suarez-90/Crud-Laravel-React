<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        "nro_contract",
        "name_p",
        "date_contract",
        "checked"       
    ];

    public function category(){
        return $this->belongsTo(Categories::class);
    }

    public function comments(){
        return $this->hasMany(Comments::class);
    }
}
