<script setup lang="ts">
import RelojDigital from '../components/RelojDigital.vue';
import CarruselComunicados from '../components/CarruselComunicados.vue';
import CarruselInyeccion from '../components/CarruselInyeccion.vue';


</script>

<template>

  <div class="flex flex-col h-screen max-h-screen w-full overflow-hidden">

    <div class="h-3/5 w-full flex">
      <div class="w-1/2 h-full overflow-auto">
        <CarruselComunicados />
      </div>

      <div class="w-1/2 h-full overflow-auto">
        <CarruselInyeccion />
      </div>
    </div>


    <div class="flex h-2/5 w-full">

      <div class="w-2/3 h-full flex">

        <div class="w-1/4 h-full flex flex-col text-white justify-end">
          <div class="my-1.5 w-full flex flex-col items-center">
            <img src="/assets/Info.png" alt="Icono informacion" class="w-6 mb-2">
            <p class="font-bold leading-2 text-lg">Información</p>
            <p class="font-extrabold text-3xl">general</p>
          </div>
          <div class="w-full flex justify-center">
            <img src="/assets/QR.png" class="w-30" alt="QR informacion">
          </div>
        </div>

        <div class="w-3/4 flex flex-col justify-end">
          <RelojDigital />
        </div>

      </div>

      <div class="w-1/3 h-full flex justify-end items-end p-3">
        <img src="/assets/Taurus_slogan.png" class="w-50" alt="Taurus Slogan">
      </div>
    </div>

  </div>

</template>

<style scoped></style>
