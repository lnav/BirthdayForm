
<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">All Memories</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Loading messages...</p>
      </div>

      <div v-else-if="error" class="bg-red-100 text-red-700 p-4 rounded-md">
        {{ error }}
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="border-b border-gray-200 pb-4 last:border-0 hover:bg-gray-50 transition-colors p-3 rounded"
        >
          <p class="text-gray-800">{{ message.Memory || 'No content' }}</p>
          <p class="text-sm text-gray-500 mt-2">{{ message.Name || 'Unavailable' }}</p>
        </div>
        
        <div v-if="messages.length === 0 && !loading" class="text-center py-8">
          <p class="text-gray-500 text-lg">No messages yet. Be the first to post one!</p>
          <router-link 
            to="/" 
            class="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Write a Message
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const messages = ref([])
const loading = ref(true)
const error = ref('')

// vibe coded, please dont steal my api key 
const API_URL = 'https://script.google.com/macros/s/AKfycbxtoblVTH-sXGLWXiBF9jMl2bAotRXwrc-4SvE_s9qxwjQ6GIornfPyAfbWDRRwgrUI/exec'

const fetchMessages = () => {
  loading.value = true
  error.value = ''
  
  // Create a unique callback name
  const callbackName = 'jsonp_callback_' + Date.now()
  
  // Define the callback function
  window[callbackName] = (data) => {
    console.log('JSONP response:', data)
    
    if (Array.isArray(data)) {
      messages.value = data.reverse() // Show newest first
    } else {
      console.error('Unexpected data format:', data)
      messages.value = []
      error.value = 'Received unexpected data format'
    }
    
    loading.value = false
    
    // Clean up
    delete window[callbackName]
    document.body.removeChild(script)
  }
  
  // Create and inject the script tag
  const script = document.createElement('script')
  script.src = `${API_URL}?callback=${callbackName}`
  script.onerror = () => {
    error.value = 'Failed to load messages. Please try again.'
    loading.value = false
    delete window[callbackName]
    if (document.body.contains(script)) {
      document.body.removeChild(script)
    }
  }
  
  document.body.appendChild(script)
}

const formatDate = (dateString) => {
  if (!dateString) return 'Date unavailable'
  try {
    const date = new Date(dateString)
    return date.toLocaleString()
  } catch (e) {
    return dateString
  }
}

onMounted(() => {
  fetchMessages()
})
</script>