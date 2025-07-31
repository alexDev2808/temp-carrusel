<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref('');
const date = ref('');

function updateTime() {
  const now = new Date()
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  time.value = `${h}:${m}`

  date.value = now.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

let interval: any = null

onMounted(() => {
  updateTime()
  interval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>


<template>
  <div class="flex flex-col justify-end">
    <p class="text-8xl xl:text-9xl  font-extrabold text-white p-0 m-0">{{ time }}</p>
    <p class="text-3xl xl:text-4xl font-bold text-white leading-3 text-center">{{ date }}</p>
  </div>
</template>


<style scoped></style>