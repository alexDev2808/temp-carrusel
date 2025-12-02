<script setup lang="ts">
import RelojDigital from '../components/RelojDigital.vue';
import CarruselEnsamble from '../components/CarruselEnsamble.vue';


</script>

<template>

    <main class="flex">
        
        <div class="flex w-1/5 mb-5 flex-col justify-end">
            <div class="w-full flex flex-col gap-1 text-white items-center justify-center">

                <div class="w-full flex flex-col items-center">
                    <img src="/assets/Info.png" alt="Icono informacion" class="w-6 mb-3">
                    <p class="font-bold leading-2 text-lg">Información</p>
                    <p class="font-extrabold text-3xl">general</p>
                </div>

                <div class="w-full flex justify-center">
                    <img src="/assets/QR.png" class="w-30" alt="QR informacion">
                </div>

                <div class="text-center mt-5">
                    <RelojDigital />
                </div>
            </div>            
        </div>
        
        <div class="flex flex-col w-4/5 h-screen ps-5">
            <CarruselEnsamble />
        </div>

    </main>

</template>

<style scoped></style>
