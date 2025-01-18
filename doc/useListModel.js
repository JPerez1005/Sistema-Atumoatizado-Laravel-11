import { ref, onMounted, computed, useGenericStore } from './conexionModelos.js';

export function useListModel(modelType) {
  const store = useGenericStore();
  const search = ref('');

  store.setModelType(modelType);

  onMounted(() => {
    store.fetchData();
  });

  const data = computed(() => store.data);
  const isLoading = computed(() => store.isLoading);
  const pagination = computed(() => store.pagination);

  const fetchPagina = async (page) => {
    await store.fetchData(page, search.value);
  };

  const buscar = async () => {
    await store.fetchData(1, search.value);
  };

  const eliminar = async (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      await store.eliminarItem(id);
      alert("Elemento eliminado con éxito");
    }
  };

  return {
    data,
    isLoading,
    pagination,
    fetchPagina,
    eliminar,
    search,
    buscar,
  };
}
