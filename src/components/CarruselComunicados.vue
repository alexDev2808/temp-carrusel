<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const elementos = [
  { id: 1, image: 'viveeco.jpg', alt: 'ViveEco' },
  { id: 2, image: 'HonestometroFem3539.jpg', alt: 'Honestometro Fem' },
  { id: 3, image: 'HonestometroPaletas3539.jpg', alt: 'Honestrometro Paletas' },
]

const currentIndex = ref(0)
const intervalTime = 50000 // 50 segundos
let autoplayInterval = null

const goToSlide = (index) => {
  if (index >= 0 && index < elementos.length) {
    currentIndex.value = index
    resetAutoplay()
  }
}

const nextSlide = () => {
  if (currentIndex.value < elementos.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
  resetAutoplay()
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = elementos.length - 1
  }
  resetAutoplay()
}

const startAutoplay = () => {
  stopAutoplay()
  autoplayInterval = setInterval(() => {
    nextSlide()
  }, intervalTime)
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

const resetAutoplay = () => {
  startAutoplay()
}

const handleKeydown = (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      prevSlide()
      break
    case 'ArrowRight':
      event.preventDefault()
      nextSlide()
      break
  }
}

onMounted(() => {
  startAutoplay()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  stopAutoplay()
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="carousel-container">
    <div class="carousel" ref="carouselRef">
      <div
        class="carousel-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(elemento, index) in elementos"
          :key="elemento.id"
          class="carousel-slide"
          :class="{ active: index === currentIndex }"
        >
          <img
            :src="'/assets/' + elemento.image"
            :alt="elemento.alt"
            class="carousel-img"
            draggable="false"
          />
        </div>
      </div>

      <!-- Indicadores -->
      <div class="carousel-indicators">
        <button
          v-for="(elemento, index) in elementos"
          :key="'indicator-' + elemento.id"
          @click="goToSlide(index)"
          class="indicator"
          :class="{ active: index === currentIndex }"
        ></button>
      </div>

      <!-- Controles -->
      <!-- <button @click="prevSlide" class="nav-button prev">
        ‹
      </button>
      <button @click="nextSlide" class="nav-button next">
        ›
      </button> -->
    </div>
  </div>
</template>



<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: #000;
  border-radius: 0px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.carousel {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  position: relative;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
  pointer-events: none;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: white;
  border-color: white;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  /* background: rgba(0, 0, 0, 0.9); */
  background: transparent;
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  /* backdrop-filter: blur(10px); */
}

.nav-button.prev {
  left: 15px;
}

.nav-button.next {
  right: 15px;
}

.nav-button:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: translateY(-50%) scale(1.1);
}

@media (max-width: 768px) {
  .carousel-container {
    max-width: 100%;
    border-radius: 0;
  }
  .carousel {
    height: 250px;
  }
  .nav-button {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  .nav-button.prev {
    left: 10px;
  }
  .nav-button.next {
    right: 10px;
  }
}
</style>