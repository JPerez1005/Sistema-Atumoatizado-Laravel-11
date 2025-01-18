<template>
    <form @submit.prevent="submit" >
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="form.email" required />
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required />
        <button type="submit" native-type="submit">Enviar</button>
    </form>
</template>

<script>
import axios from '../../axiosConfig.js';
import { useGenericStore } from '../../store/useGenericStore.js';
export default{

    created() {
        console.log("estás autenticado?:"+this.$root.isLoggedIn);
        if (this.$root.isLoggedIn) {
            // alert("redirigiendo")
            this.$router.push({name:'listas'})
            // window.location.href = '/vue#/listas';
            return null;
        }else{
            this.$router.push({name:'login'})
        }
    },
    data(){
        return{
            form:{
                email:'',
                password:'',
            },
            errors:{
                login:''
            }

        }
    },
    methods: {
        cleanErrorsForm(){
            this.errors.login=''
        },
        submit(){
            alert("ingresando...")
            this.cleanErrorsForm()
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.post('/api/user/login', this.form).then(response => {
                    const token = response.data.token; // Guarda el token
                    console.log('Token obtenido:', token);

                    // Guarda el token en el Local Storage
                    localStorage.setItem('auth_token', token);
                    const genericStore = useGenericStore();
                    genericStore.setToken(token);

                    // Configura el encabezado de autorización globalmente
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    // Ahora intenta acceder a /api/user
                    axios.get('/api/user').then(response => {
                        console.log('Usuario autenticado:', response.data);
                        this.$root.isLoggedIn=true;
                        window.location.href='/vue#/listas';
                    }).catch(error => {
                        console.log('Error al obtener usuario:', error.response.data);
                    });
                }).catch(error => {
                    console.log('Error en autenticación:', error.response.data);
                    this.errors.login=error.response.data
                    alert("escribió algo mal")
                });
            });
        },
    },
}
</script>