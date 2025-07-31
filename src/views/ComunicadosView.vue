<script setup lang="ts">
import RelojDigital from '../components/RelojDigital.vue';
import CarruselComunicados from '../components/CarruselComunicados.vue';
import VideosEnsamble from '../components/VideosEnsamble.vue';
import CarruselAnuncios from '../components/CarruselAnuncios.vue';


</script>

<template>

    <main class="flex">
        <div class="flex flex-col w-2/5 h-screen ps-3">
            <div class="h-3/5 mt-2">
                <div class="flex justify-between">
                    <img src="/assets/Taurus_slogan.png" alt="Logo Taurus" width="120">
                    <h2 class="font-bold text-2xl text-white">Anuncios</h2>
                </div>
                <div class="w-full h-full">
                    <CarruselAnuncios />
                </div>
            </div>

            <div class="h-2/5 flex pb-5 gap-2 me-0">
                <div class="w-1/4 flex flex-col gap-1 text-white justify-end">
                    <div class="w-full flex flex-col items-center">
                        <img src="/assets/Info.png" alt="Icono informacion" class="w-6 mb-3">
                        <p class="font-bold leading-2 text-lg">Información</p>
                        <p class="font-extrabold text-3xl">general</p>
                    </div>
                    <div class="w-full flex justify-center">
                        <img src="/assets/QR.png" class="w-30" alt="QR informacion">
                    </div>
                </div>

                <div class="w-3/4 flex">
                    <RelojDigital />
                </div>
            </div>
        </div>

        <div class="flex flex-col w-3/5 h-screen">
            <CarruselComunicados />
            <VideosEnsamble />
        </div>

    </main>

</template>

<style scoped></style>
