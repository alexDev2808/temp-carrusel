<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  timeSize?: string
  dateSize?: string
}

const props = withDefaults(defineProps<Props>(), {
  timeSize: 'text-6xl xl:text-7xl',
  dateSize: 'text-2xl xl:text-3xl'
})

const time = ref('');
const date = ref('');

function updateTime() {
  const now = new Date()
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  time.value = `${h}:${m}`

  date.value = now.toLocaleDateString('es-MX', {
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
    <p :class="[props.timeSize, 'font-extrabold text-white p-0 m-0']">{{ time }}</p>
    <p :class="[props.dateSize, 'font-bold text-white leading-3 text-center']">{{ date }}</p>
  </div>
</template>


<style scoped></style>