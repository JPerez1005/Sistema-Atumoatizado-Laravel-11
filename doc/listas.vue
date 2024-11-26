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
        buscar } = useListModel('prueba2');
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