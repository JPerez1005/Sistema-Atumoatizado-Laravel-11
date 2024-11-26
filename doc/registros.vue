<template>
<form @submit.prevent="enviar">
    <div>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="form.nombre" required />
    </div>
    <div>
        <label for="stock">Stock:</label>
        <input type="number" id="stock" v-model="form.stock" required />
    </div>
    <button type="submit">{{ editMode ? 'Actualizar' : 'Registrar' }}</button>
    <button type="button" @click="cancelar">Cancelar</button>
</form>
                    
</template>
<script>

import { useFormModel } from '../jsComponents/conexionModelos.js';

export default {
    setup() {
    const { form, enviar, cancelar, editMode } = useFormModel('prueba2', {
        nombre: '',
        stock: 0,
    });

    return {
        form,
        enviar,
        cancelar,
        editMode,
    };
    },
};
                    
</script>