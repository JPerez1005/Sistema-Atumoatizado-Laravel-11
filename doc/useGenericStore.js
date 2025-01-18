// src/stores/GenericStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useGenericStore = defineStore('generic', {
  state: () => ({
    data: [],
    isLoading: false,
    modelType: '',
    url: 'http://127.0.0.1:8000/api/',
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken;
    },
    setData(data) {
      this.data = data;
    },
    setModelType(modelType) {
      this.modelType = modelType;
    },
    // el siguiente fetchData solo sirve para sanctum con tokens, descomentarlo si lo cree necesario
    // async fetchData() {
    //   if (!this.token) {
    //     console.error('No se encontró el token en el estado global.');
    //     this.setData(null);
    //     window.location.href = '/vue#/login';
    //     return;
    //   }

    //   try {
    //     console.log('Token enviado:', this.token);
    //     const response = await axios.get(`${this.url}${this.modelType}/all`, {
    //       headers: {
    //         Authorization: `Bearer ${this.token}`,
    //       },
    //     });
    //     this.setData(response.data);
    //   } catch (error) {
    //     console.error('Error al cargar los datos:', error.response || error);
    //   }
    // },
    //comentar el siguiene fecthData si va a usar la funcion fecthData con sanctum en tokens
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
