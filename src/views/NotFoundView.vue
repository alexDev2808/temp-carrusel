<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen text-white font-bold gap-2">
        <h1 class="text-6xl">No se encontro!</h1>
        <p>La página que buscabas no existe, revisa bien el nombre de la dirección.</p>
        <router-link to="/" class="bg-blue-900 py-3 px-6 rounded-lg flex items-center justify-center">Regresar a Inicio</router-link>
    </div>
</template>