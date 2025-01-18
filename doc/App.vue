<template>
    <!-- TODO LO QUE ESTÁ COMENTADO DESCOMENTARLO APENAS EMPIECE A USAR SANCTUM -->
    <!-- <button @click="logout">cerrar session</button> -->
        <router-link :to="{name:'listas'}" class="inicio">Listas</router-link>
        <router-link :to="{name:'registrar'}" class="inicio">Registros</router-link>
    <router-view></router-view>
    <!-- <meta name="csrf-token" content="{{ csrf_token() }}"> -->
</template>

<script>
    // import axios from './axiosConfig.js';
    // import { useGenericStore } from './store/useGenericStore.js';

    export default {
        // mounted() {
        //     console.log(window.appData);
        //     if (!window.appData || !window.appData.isLoggedIn) {
        //         localStorage.removeItem('auth_token');
        //         this.isLoggedIn = false;
        //         this.user = null;
        //         this.token = null;
        //     } else {
        //         this.isLoggedIn = window.appData.isLoggedIn;
        //         this.user = window.appData.user;
        //         this.token = window.appData.token;
        //     }

        //     // Verifica si hay un token en localStorage
        //     const token = localStorage.getItem('auth_token');

        //     if (token) {
        //         // Si hay un token, configurar el encabezado Authorization
        //         const config = {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         };

        //         // Hacer la solicitud para obtener los datos del usuario
        //         axios.get('/api/user', config)
        //             .then(response => {
        //                 // Aquí obtienes los datos del usuario autenticado
        //                 console.log('Usuario autenticado:', response.data);
        //                 this.isLoggedIn = true;
        //                 console.log("logueado:",this.isLoggedIn);
        //                 this.user = response.data; // Asigna los datos del usuario
        //                 console.log("usuario:",this.user);
        //                 this.token = token;
        //                 console.log("token:",this.token);
        //             })
        //             .catch(error => {
        //                 console.log('Error al obtener el usuario:', error.response ? error.response.data : error.message);
        //             });
        //     } else {
        //         // Si no hay token, el usuario no está autenticado
        //         this.isLoggedIn = false;
        //         console.log('No hay token, el usuario no está autenticado.');
        //     }

        // },
        // methods: {
        //     logout() {
        //         const token = localStorage.getItem('auth_token');
        //         const config = {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         };
        //         // Llamar al backend para cerrar sesión
        //         this.$axios.post('/api/user/logout', null, config)
        //             .then(() => {
        //                 // Elimina el token del localStorage
        //                 localStorage.removeItem('auth_token');

        //                 // Actualiza el estado local del usuario en el frontend
        //                 this.isLoggedIn = false;
        //                 this.user = null;
        //                 this.token = null;

        //                 // Limpia window.appData
        //                 window.appData = { isLoggedIn: false, user: null, token: null };

        //                 console.log("Datos de appData después del logout:", window.appData);
        //                 const genericStore = useGenericStore();
        //                 genericStore.setToken(null);
        //                 this.$root.isLoggedIn=false;
        //                 // Redirige a la página de inicio o login
        //                 this.$router.push({ name: 'login' });
        //             })
        //             .catch(error => {
        //                 console.error("Error al cerrar sesión:", error.response ? error.response.data : error.message);
        //             });
        //     }
        // },

        name: 'App',
        components: {
        }
    }
</script>