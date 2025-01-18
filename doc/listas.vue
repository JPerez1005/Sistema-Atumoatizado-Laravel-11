<template>
<tr v-for="item in data" :key="item.id">
    <td>{{ item.nombre }}</td>
    <td>{{ item.stock }}</td>
</tr>
                    
</template>
<script>

import { useListModel } from '../jsComponents/conexionModelos.js';

export default {
  setup() {
    const { data,
        isLoading,
        pagination,
        fetchPagina,
        eliminar,
        search,
        buscar } 
        // recordar colocar el nombre 
        // de su tabla a referenciar=>
        = useListModel('nombre_tabla');
    return {
      data,
      isLoading,
      pagination,
      fetchPagina,
      eliminar,
      search,
      buscar,
    };
  },
};
</script>
<style lang="">
    
</style>