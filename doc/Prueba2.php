<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prueba2 extends Model
{
    
  public $timestamps = true;

  protected $fillable = ['nombre'];

  protected $table = 'prueba2';


  public static function validationRules() {
    return [
      'nombre'=>'required|min:5|max:500'
    ];
  }
}
