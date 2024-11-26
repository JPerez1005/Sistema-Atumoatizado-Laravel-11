// src/stores/GenericStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useGenericStore = defineStore('generic', {
  state: () => ({
    data: [],
    isLoading: false,
    modelType: '',
    url: 'http://pruebasSanctum.test/api/',
  }),
  actions: {
    setData(data) {
      this.data = data;
    },
    setModelType(modelType) {
      this.modelType = modelType;
    },
    async fetchData() {
      if (!this.modelType) throw new Error("Model type is not set");
      this.isLoading = true;
      try {
        const response = await axios.get(`${this.url}${this.modelType}/all`);
        this.setData(response.data);
      } catch (error) {
        console.error(`Error al cargar ${this.modelType}:`, error);
      } finally {
        this.isLoading = false;
      }
    },
    async eliminarItem(id) {
      if (!this.modelType) throw new Error("Model type is not set");
      try {
        await axios.delete(`${this.url}${this.modelType}/${id}`);
        this.data = this.data.filter(item => item.id !== id);
      } catch (error) {
        console.error(`Error al eliminar ${this.modelType}:`, error);
      }
    },
    async actualizarItem(id, datos) {
      if (!this.modelType) throw new Error("Model type is not set");
      try {
        const response = await axios.put(`${this.url}${this.modelType}/${id}`, datos);
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
          this.data[index] = response.data;
        }
      } catch (error) {
        console.error(`Error al actualizar ${this.modelType}:`, error);
      }
    },
    async agregarItem(datos) {
      if (!this.modelType) throw new Error("Model type is not set");
      try {
        console.log(`URL construida: ${this.url}${this.modelType}`);
        const response = await axios.post(`${this.url}${this.modelType}`, datos);
        this.data.push(response.data);
      } catch (error) {
        console.error(`Error al agregar ${this.modelType}:`, error);
      }
    }
  },
  persist: true,
});
