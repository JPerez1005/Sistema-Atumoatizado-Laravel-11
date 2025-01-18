<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function login(Request $request)
    {
        // Validación de datos de entrada
        $validator = validator()->make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Obtener los datos validados
        $credentials = $validator->validated();

        // Intentar autenticar al usuario
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();
            $token = $user->createToken('pruebalara')->plainTextToken;
            session()->put('token', $token);
            
            // Devolver respuesta con estado de autenticación
            return response()->json([
                'message' => 'successful authentication',
                'isLoggedIn' => true,
                'user' => $user, // Convierte el usuario a un array
                'token' => $token,
            ]);
        }

        // Respuesta en caso de credenciales incorrectas
        return response()->json([
            'message' => 'El usuario y/o contraseña están mal escritas',
        ], 401);
    }


    public function logout(Request $request)
    {

        // Verifica si la sesión está disponible
        // dd($request->all(), $request->headers->all(), $request->user(), $request->hasSession());
        // if (!$request->hasSession()) {
        //     return response()->json(['error' => 'Sesión no disponible'], 500);
        // }

        if ($request->user()) {
            // Eliminar todos los tokens asociados al usuario
            $request->user()->tokens()->delete();
        }

        // Invalidar la sesión
        if ($request->hasSession()) {
            $request->session()->invalidate();
        }

        // Regenerar el ID de sesión
        // $request->session()->regenerateToken();

        // Respuesta con los datos vacíos
        return response()->json([
            'isLoggedIn' => false,
            'user' => null, // Devolver null para representar usuario vacío
            'token' => '', // Cadena vacía para el token
        ]);
    }


}
