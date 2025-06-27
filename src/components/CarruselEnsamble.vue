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
            <iframe class="w-full" height="295" src="https://lookerstudio.google.com/embed/reporting/e687bb67-03ce-4d1b-b100-585d7d7e8c7e/page/yM8RE" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>
        </SplideSlide>
        <SplideSlide>
            <iframe class="w-full" height="295" src="https://lookerstudio.google.com/embed/reporting/e687bb67-03ce-4d1b-b100-585d7d7e8c7e/page/p_hygqsk2xmd" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>
        </SplideSlide>
        <SplideSlide>
            <iframe class="w-full" height="295" src="https://lookerstudio.google.com/embed/reporting/e687bb67-03ce-4d1b-b100-585d7d7e8c7e/page/p_rhblmi4xmd" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>
        </SplideSlide>
        <SplideSlide>
            <iframe class="w-full" height="295" src="https://lookerstudio.google.com/embed/reporting/e687bb67-03ce-4d1b-b100-585d7d7e8c7e/page/p_cd4x3c9wnd" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>
        </SplideSlide>

    </Splide>

</template>

<style scoped></style>