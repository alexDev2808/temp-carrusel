<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>

    <main class="flex flex-col items-center justify-center gap-3 text-white h-screen">
        <h1 class="text-6xl font-bold">Inicio</h1>
        <div class="flex flex-col gap-2">
            <router-link to="/ensamble" class="py-3 px-6 text-center bg-blue-900 hover:bg-blue-700">Ensamble</router-link>
            <router-link to="/inyeccion" class="py-3 px-6 text-center bg-blue-900 hover:bg-blue-700">Inyección</router-link>
            <router-link to="/comunicados" class="py-3 px-6 text-center bg-blue-900 hover:bg-blue-700">Comunicados</router-link>
        </div>
    </main>

</template>