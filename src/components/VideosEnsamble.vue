<script setup>
import { ref, onMounted, onUnmounted, nextTick, reactive } from 'vue'

// Props y datos
const elementos = [
  { id: 1, videoName: 'BlazeV2_ing_esp.mp4', title: 'Blaze v2' },
  { id: 2, videoName: 'ConoceTuCredencial.mp4', title: 'Conoce tu credencial Taurus' },
  { id: 3, videoName: 'Calidad.mp4', title: 'Calidad Taurus' },
]

// Referencias reactivas
const currentIndex = ref(0)
const userInteracted = ref(false)
const carouselRef = ref(null)
const videoRefs = ref([])
const videosLoaded = ref(new Array(elementos.length).fill(false))
const isPlaying = reactive(new Array(elementos.length).fill(false))
const showDebug = ref(true)

// Funciones principales
const startCarousel = async () => {
  userInteracted.value = true
  await nextTick()
  playCurrentVideo()
}

const playCurrentVideo = async () => {
  const currentVideo = videoRefs.value[currentIndex.value]
  if (currentVideo && videosLoaded.value[currentIndex.value]) {
    try {
      // Pausar todos los otros videos
      videoRefs.value.forEach((video, index) => {
        if (video && index !== currentIndex.value) {
          video.pause()
          video.currentTime = 0
          isPlaying[index] = false
        }
      })

      // Reproducir el video actual
      currentVideo.currentTime = 0
      await currentVideo.play()
      isPlaying[currentIndex.value] = true
      console.log(`Reproduciendo video ${currentIndex.value + 1}`)
    } catch (error) {
      console.error('Error al reproducir video:', error)
      isPlaying[currentIndex.value] = false
    }
  }
}

const pauseCurrentVideo = () => {
  const currentVideo = videoRefs.value[currentIndex.value]
  if (currentVideo) {
    currentVideo.pause()
    isPlaying[currentIndex.value] = false
  }
}

const goToSlide = async (index) => {
  if (index >= 0 && index < elementos.length && index !== currentIndex.value) {
    pauseCurrentVideo()
    currentIndex.value = index
    await nextTick()
    if (userInteracted.value) {
      playCurrentVideo()
    }
  }
}

const nextSlide = () => {
  if (currentIndex.value < elementos.length - 1) {
    goToSlide(currentIndex.value + 1)
  } else {
    // Volver al inicio (loop)
    goToSlide(0)
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    goToSlide(currentIndex.value - 1)
  }
}

const handleVideoEnded = (index) => {
  console.log(`Video ${index + 1} terminó`)
  isPlaying[index] = false
  
  // Avanzar automáticamente al siguiente slide
  setTimeout(() => {
    nextSlide()
  }, 500) // Pequeña pausa antes de avanzar
}

const handleVideoLoaded = (index) => {
  videosLoaded.value[index] = true
  console.log(`Video ${index + 1} cargado`)
  
  // Si es el primer video y el usuario ya interactuó, reproducirlo
  if (index === 0 && userInteracted.value && currentIndex.value === 0) {
    playCurrentVideo()
  }
}

const handleVideoError = (index) => {
  console.error(`Error cargando video ${index + 1}`)
  videosLoaded.value[index] = false
}

const togglePlay = (index) => {
  const video = videoRefs.value[index]
  if (video) {
    if (isPlaying[index]) {
      video.pause()
      isPlaying[index] = false
    } else {
      if (index !== currentIndex.value) {
        goToSlide(index)
      } else {
        video.play()
        isPlaying[index] = true
      }
    }
  }
}

// Manejo de teclado
const handleKeydown = (event) => {
  if (!userInteracted.value) return
  
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      prevSlide()
      break
    case 'ArrowRight':
      event.preventDefault()
      nextSlide()
      break
    case ' ':
      event.preventDefault()
      togglePlay(currentIndex.value)
      break
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  
  // Precargar el primer video
  if (videoRefs.value[0]) {
    videoRefs.value[0].load()
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  
  // Pausar todos los videos al desmontar
  videoRefs.value.forEach(video => {
    if (video) {
      video.pause()
    }
  })
})
</script>

<template>
  <div class="carousel-container">
    <!-- Botón de inicio para habilitar autoplay -->
    <div v-if="!userInteracted" class="start-overlay">
      <button @click="startCarousel" class="start-button">
        ▶ Iniciar Carrusel
      </button>
    </div>

    <!-- Carrusel -->
    <div class="carousel" ref="carouselRef">
      <div 
        class="carousel-track" 
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div 
          v-for="(elemento, index) in elementos" 
          :key="elemento.id"
          class="carousel-slide"
          :class="{ 'active': index === currentIndex }"
        >
          <video
            :ref="el => videoRefs[index] = el"
            :src="'assets/videos/' + elemento.videoName"
            class="carousel-video"
            @ended="handleVideoEnded(index)"
            @loadeddata="handleVideoLoaded(index)"
            @error="handleVideoError(index)"
            muted
            playsinline
            preload="metadata"
          ></video>
          
          <!-- Overlay con información del video -->
          <div class="video-overlay">
            <!-- <h3>{{ elemento.title || `Video ${index + 1}` }}</h3> -->
            <!-- <div class="video-controls">
              <button @click="togglePlay(index)" class="control-btn">
                {{ isPlaying[index] ? '⏸' : '▶' }}
              </button>
            </div> -->
          </div>
        </div>
      </div>

      <!-- Indicadores -->
      <div class="carousel-indicators">
        <button
          v-for="(elemento, index) in elementos"
          :key="`indicator-${elemento.id}`"
          @click="goToSlide(index)"
          class="indicator"
          :class="{ 'active': index === currentIndex }"
        ></button>
      </div>

      <!-- Controles de navegación -->
      <!-- <button @click="prevSlide" class="nav-button prev" :disabled="currentIndex === 0">
        ‹
      </button>
      <button @click="nextSlide" class="nav-button next" :disabled="currentIndex === elementos.length - 1">
        ›
      </button> -->
    </div>

    <!-- Información de debug -->
    <!-- <div class="debug-info" v-if="showDebug">
      <p>Slide actual: {{ currentIndex + 1 }}/{{ elementos.length }}</p>
      <p>Usuario interactuó: {{ userInteracted }}</p>
      <p>Videos cargados: {{ videosLoaded.filter(Boolean).length }}/{{ elementos.length }}</p>
    </div> -->
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

.start-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.start-button {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 16px 32px;
  font-size: 18px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.start-button:hover {
  background: #ff5252;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
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
  position: relative;
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
}

.carousel-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 20px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.carousel-slide:hover .video-overlay,
.carousel-slide.active .video-overlay {
  transform: translateY(0);
}

.video-overlay h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
}

.video-controls {
  display: flex;
  gap: 10px;
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
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

.indicator:hover {
  border-color: rgba(255, 255, 255, 0.8);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  /* background: rgba(0, 0, 0, 0.5); */
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

.nav-button:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.1);
  transform: translateY(-50%) scale(1.1);
}

.nav-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-button.prev {
  left: 15px;
}

.nav-button.next {
  right: 15px;
}

.debug-info {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 6px;
  font-size: 12px;
  z-index: 20;
}

.debug-info p {
  margin: 2px 0;
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-container {
    max-width: 100%;
    border-radius: 0;
  }
  
  .carousel {
    height: 300px;
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
  
  .video-overlay {
    padding: 15px;
  }
  
  .video-overlay h3 {
    font-size: 16px;
  }
}
</style>