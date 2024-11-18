<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class nombre_tabla extends Model
{
    
  public $timestamps = true;

  protected $fillable = [];

  protected $table = 'nombre_tabla';

  public static function validationRules() {
    return [
    ];
  }

}