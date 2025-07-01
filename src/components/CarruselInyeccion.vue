<script setup>

const options = {
    rewind: true,
    gap: '1rem',
    autoplay: true,
    interval: 60000,
    type: 'loop',
    drag: true,
}
</script>

<template>

    <Splide :options="options" aria-label="Carrusel Ensamble">
        <SplideSlide>
            <iframe class="w-full" height="495" src="https://lookerstudio.google.com/embed/reporting/037bd223-69ca-4a01-81d0-bdc0d40a7fb4/page/p_f6hxkun0fd" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>
        </SplideSlide>
        <SplideSlide>
            <iframe class="w-full" height="495" src="https://lookerstudio.google.com/embed/reporting/037bd223-69ca-4a01-81d0-bdc0d40a7fb4/page/p_8uhwj24qgd" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>
        </SplideSlide>
        <SplideSlide>
            <iframe class="w-full" height="495" src="https://lookerstudio.google.com/embed/reporting/037bd223-69ca-4a01-81d0-bdc0d40a7fb4/page/p_t5s21rgcfd" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>
        </SplideSlide>
        <SplideSlide>
            <iframe class="w-full" height="495" src="https://lookerstudio.google.com/embed/reporting/037bd223-69ca-4a01-81d0-bdc0d40a7fb4/page/p_w4gf91btfd" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>
        </SplideSlide>

    </Splide>

</template>

<style scoped></style>