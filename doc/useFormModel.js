import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useGenericStore } from '../store/useGenericStore.js';

export function useFormModel(modelType, defaultForm) {
  const store = useGenericStore();
  const router = useRouter();
  const route = useRoute();

  store.setModelType(modelType);

  const form = ref({ ...defaultForm });

  const editMode = ref(route.params.id !== undefined);

  watch(() => route.params.id, (newId) => {
    if (newId === undefined) {
      Object.keys(defaultForm).forEach(key => {
        form.value[key] = defaultForm[key];
      });
      editMode.value = false;
    } else {
      editMode.value = true;
      const item = store.data.find(item => item.id === parseInt(newId));
      if (item) {
        Object.keys(defaultForm).forEach(key => {
          form.value[key] = item[key];
        });
      }
    }
  });

  onMounted(() => {
    if (editMode.value) {
      const item = store.data.find(item => item.id === parseInt(route.params.id));
      if (item) {
        Object.keys(defaultForm).forEach(key => {
          form.value[key] = item[key];
        });
      }
    }
  });

  const enviar = async () => {
    try {
      if (editMode.value) {
        await store.actualizarItem(route.params.id, form.value);
        hablar("Elemento actualizado con éxito");
      } else {
        await store.agregarItem(form.value);
        hablar("Elemento registrado con éxito");
      }
      // router.push({ name: `Tabla${modelType.charAt(0).toUpperCase() + modelType.slice(1).replace(/_/g, '')}` });
    } catch (error) {
      console.error("Error registrando el elemento:", error);
      hablar("Error registrando el elemento");
    }
  };

  const cancelar = () => {
    // router.push({ name: `Tabla${modelType.charAt(0).toUpperCase() + modelType.slice(1).replace(/_/g, '')}` });
  };

  return {
    form,
    enviar,
    cancelar,
    editMode,
  };
}
