<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const elementos = [
    {
        id: 1,
        titulo: 'Suspensión de labores',
        contenido: 'Las proximas fechas serán del 04 al 17 de agosto, reactivando el 18 de agosto.'
    },
    {
        id: 2,
        titulo: 'Apoyo de útiles escolares',
        contenido: 'Recuerda, tienes hasta el 04 de agosto para hacer el registro y aprovechar este apoyo.'
    },
    {
        id: 3,
        titulo: 'Frase de la semana',
        contenido: 'Cuando todo parezca ir contra ti, recuerda que el avión despega contra el viento, no a favor de él. (Henry Ford)'
    },
    {
        id: 4,
        titulo: 'Capacitación continua',
        contenido: 'Nuevos cursos disponibles en la plataforma de aprendizaje. Inscríbete antes del 15 de agosto.'
    },
    {
        id: 5,
        titulo: 'Reunión mensual',
        contenido: 'La próxima reunión general será el viernes 25 de agosto a las 10:00 AM en el auditorio principal.'
    }
];

const currentIndex = ref(0)
const intervalTime = 15000
let autoplayInterval = null

const totalSlides = Math.ceil(elementos.length / 2)

const getCardsForSlide = (slideIndex) => {
  const startIndex = slideIndex * 2
  return elementos.slice(startIndex, startIndex + 2)
}

const goToSlide = (index) => {
  if (index >= 0 && index < totalSlides) {
    currentIndex.value = index
    resetAutoplay()
  }
}

const nextSlide = () => {
  if (currentIndex.value < totalSlides - 1) {
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
    currentIndex.value = totalSlides - 1
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
    case 'ArrowUp':
      event.preventDefault()
      prevSlide()
      break
    case 'ArrowDown':
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
        :style="{ transform: `translateY(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="slideIndex in totalSlides"
          :key="'slide-' + slideIndex"
          class="carousel-slide"
          :class="{ active: slideIndex - 1 === currentIndex }"
        >
          <div class="cards-container">
            <div
              v-for="elemento in getCardsForSlide(slideIndex - 1)"
              :key="elemento.id"
              class="card"
            >
              <div class="card-header">
                <h3 class="card-title">{{ elemento.titulo }}</h3>
              </div>
              <div class="card-body">
                <p class="card-content">{{ elemento.contenido }}</p>
              </div>
              <div class="card-footer">
                <span class="card-id">#{{ elemento.id }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Indicadores -->
      <!-- <div class="carousel-indicators">
        <button
          v-for="slideIndex in totalSlides"
          :key="'indicator-' + slideIndex"
          @click="goToSlide(slideIndex - 1)"
          class="indicator"
          :class="{ active: slideIndex - 1 === currentIndex }"
        >
          <span class="indicator-text">{{ slideIndex }}</span>
        </button>
      </div> -->
    </div>

    <!-- Información del slide actual -->
    <div class="slide-info">
      <span>{{ currentIndex + 1 }} / {{ totalSlides }}</span>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  height: 100%; /* Ocupa el 100% del contenedor padre */
  max-width: 600px;
  margin: 0 auto;
  background: transparent;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.carousel {
  position: relative;
  width: 100%;
  height: 100%; /* Ocupa el 100% del contenedor */
  overflow: hidden;
}

.carousel-track {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-slide {
  flex: 0 0 100%; /* Cada slide ocupa exactamente el 100% de la altura */
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  display: flex; /* Añadido para centrar el contenido */
  align-items: center; /* Centra verticalmente */
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  height: auto; /* Cambiado de 100% a auto */
  justify-content: center;
  flex: 1; /* Ocupa todo el espacio disponible */
}

.card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  flex: 1; /* Cada tarjeta ocupa el mismo espacio disponible */
  max-height: 140px; /* Altura mínima para las tarjetas */
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.card-header {
  margin-bottom: 12px;
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.3;
}

.card-body {
  margin-bottom: 15px;
  flex: 1; /* El contenido ocupa el espacio disponible */
}

.card-content {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #4a5568;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto; /* Empuja el footer hacia abajo */
}

.card-id {
  font-size: 12px;
  color: #718096;
  background: rgba(102, 126, 234, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
}

.carousel-indicators {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
}

.indicator {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.indicator.active {
  background: rgba(255, 255, 255, 0.9);
  border-color: white;
  transform: scale(1.1);
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.4);
  border-color: rgba(255, 255, 255, 0.8);
}

.indicator-text {
  font-size: 12px;
  font-weight: 600;
  color: #2d3748;
}

.indicator.active .indicator-text {
  color: #667eea;
}

.slide-info {
  position: absolute;
  bottom: 15px;
  left: 20px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  backdrop-filter: blur(10px);
  z-index: 10;
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-container {
    max-width: 100%;
    border-radius: 0;
    margin: 0;
  }
  
  .carousel-slide {
    padding: 15px;
  }
  
  .cards-container {
    gap: 12px;
  }
  
  .card {
    padding: 16px;
    min-height: 100px;
  }
  
  .card-title {
    font-size: 16px;
  }
  
  .card-content {
    font-size: 13px;
  }
  
  .carousel-indicators {
    right: 15px;
  }
  
  .indicator {
    width: 28px;
    height: 28px;
  }
  
  .indicator-text {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .carousel-slide {
    padding: 12px;
  }
  
  .card {
    padding: 14px;
    min-height: 90px;
  }
  
  .card-title {
    font-size: 15px;
  }
  
  .card-content {
    font-size: 12px;
  }
}
</style>