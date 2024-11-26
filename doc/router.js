import { createRouter,createWebHashHistory } from "vue-router";
import listas from "./components/listas.vue";
import registrar from "./components/registros.vue";

const routes = [
    {
        name: 'home',
        path: '/',
        redirect: '/vue'  // Redirigir la raíz a la ruta '/vue'
    },
    {
        name: 'listas',
        path: '/listas',
        component: listas
    },
    {
        name: 'registrar',
        path: '/registrar',
        component: registrar
    },
];

const router=createRouter({
    history: createWebHashHistory(),
    routes:routes
});

export default router;