<script setup>

const elementos = [
    { id: 1, image: 'inicio.jpg', alt: 'Imagen Inicio Taurus' },
    { id: 2, image: 'calidad_taurus.jpg', alt: 'Calidad Taurus' },
    { id: 2, image: 'viveeco.jpg', alt: 'Calidad Taurus' },
    { id: 2, image: 'ventainterna.jpg', alt: 'Calidad Taurus' },
    { id: 2, image: '5eses.jpg', alt: 'Calidad Taurus' },
    { id: 2, image: 'honestometro.jpg', alt: 'Calidad Taurus' },
]

const options = {
    rewind: true,
    gap: '1rem',
    autoplay: true,
    interval: 30000,
    type: 'loop',
    drag: true,
}
</script>

<template>

    <Splide :options="options" aria-label="Carrusel Ensamble">
        <SplideSlide v-for="elemento in elementos" :key="elemento.id">
            <img :src="'/assets/' + elemento.image" :alt="elemento.alt" class="object-cover w-full h-full">
        </SplideSlide>
    </Splide>

</template>

<style scoped></style>