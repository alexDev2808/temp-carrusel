<script setup lang="ts">
import RelojDigital from './components/RelojDigital.vue';

const options = {
  rewind: true,
  gap: '1rem',
  autoplay: true,
  interval: 3000,
  type: 'loop',
  drag: true,
}

</script>

<template>

  <div class="w-full min-h-screen overflow-hidden">

    <div class="grid grid-cols-2 gap-2 h-2/3 overflow-hidden">
      <div class="">
        <Splide :options="options" aria-label="Carrusel Ensamble">
          <SplideSlide>
            <img src="/assets/image3.jpg" class="object-cover w-full h-full" alt="Sample 1">
          </SplideSlide>
          <SplideSlide>
            <img src="/assets/image4.jpg" class="object-cover w-full h-full" alt="Sample 2">
          </SplideSlide>
        </Splide>
      </div>

    </div>

    <div class="h-1/3 ps-12 py-8">

        <div class="grid grid-cols-2 h-full gap-2">

          <div class="flex">

            <div class="flex flex-col justify-end text-white">
              <img src="/assets/Info.png" alt="Icono informacion" class="w-10 m-auto">
              <div class="my-4 text-justify w-full"> 
                <p class="text-3xl leading-2 font-bold">Información</p>
                <p class="text-5xl font-extrabold">general</p>
              </div>
              <img src="/assets/QR.png" alt="QR informacion">
            </div>

            <div class="ms-12 flex flex-col justify-end">
              <RelojDigital />
            </div>

          </div>

          <div class="flex justify-end items-end pe-12 pb-1">
            <img src="/assets/Taurus_slogan.png" alt="Taurus Slogan">
          </div>

        </div>
      
    </div>

  </div>

</template>

<style scoped></style>
