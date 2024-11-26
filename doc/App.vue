<template>
        <router-link :to="{name:'listas'}" class="inicio">Listas</router-link>
        <router-link :to="{name:'registrar'}" class="inicio">Registros</router-link>
    <router-view></router-view>
</template>

<script>
    export default {
        name: 'App',
        components: {
        }
    }
</script>