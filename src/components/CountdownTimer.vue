<template>
  <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 text-white">
    <h3 class="text-xl font-bold mb-4 text-center">Annanya Ray's birthday is in...</h3>
    
    <div class="grid grid-cols-4 gap-4 text-center">
      <!-- Days -->
      <div class="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
        <div class="text-4xl font-bold">{{ days }}</div>
      </div>
      
      <!-- Hours -->
      <div class="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
        <div class="text-4xl font-bold">{{ hours }}</div>
      </div>
      
      <!-- Minutes -->
      <div class="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
        <div class="text-4xl font-bold">{{ minutes }}</div>
      </div>
      
      <!-- Seconds -->
      <div class="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
        <div class="text-4xl font-bold">{{ seconds }}</div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Set your target date here (YYYY-MM-DD HH:MM:SS)
const targetDate = new Date('2026-04-22 00:00:00').getTime()

const now = ref(Date.now())
let interval = null

// Computed values for each time unit
const days = computed(() => {
  const difference = targetDate - now.value
  if (difference <= 0) return 0
  return Math.floor(difference / (1000 * 60 * 60 * 24))
})

const hours = computed(() => {
  const difference = targetDate - now.value
  if (difference <= 0) return 0
  return Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
})

const minutes = computed(() => {
  const difference = targetDate - now.value
  if (difference <= 0) return 0
  return Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
})

const seconds = computed(() => {
  const difference = targetDate - now.value
  if (difference <= 0) return 0
  return Math.floor((difference % (1000 * 60)) / 1000)
})

const isExpired = computed(() => {
  return targetDate - now.value <= 0
})

// Update the current time every second
const updateTime = () => {
  now.value = Date.now()
}

// Start the timer when component mounts
onMounted(() => {
  interval = setInterval(updateTime, 1000)
})

// Clean up interval when component is destroyed
onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>