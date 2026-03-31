<template>
  <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6">
    
    <form @submit.prevent="submitMessage">
      <div class="mb-4">

        <textarea
          id="name"
          v-model="name"
          rows="1"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Your name..."
          :disabled="loading"
        ></textarea>
        
        <textarea
          id="message"
          v-model="message"
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Write your favourite memory..."
          :disabled="loading"
        ></textarea>
      </div>
      
      <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
        {{ error }}
      </div>
      
      <div v-if="success" class="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
        {{ success }}
      </div>
      
      <button
        type="submit"
        :disabled="loading || !message.trim() || !name.trim()"
        class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {{ loading ? 'Submitting...' : 'Submit Message' }}
      </button>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const GOOGLE_FORM_ENTRY_ID_name = 'entry.1983382756' // Replace with your actual entry ID
const GOOGLE_FORM_ENTRY_ID_mem = 'entry.1681649521' // Replace with your actual entry ID

const name = ref('')
const message = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const submitMessage = async () => {
  if (!message.value.trim()) return
  if (!name.value.trim()) return

  
  loading.value = true
  error.value = ''
  success.value = ''
  
  try {
    const formData = new URLSearchParams()

    formData.append(GOOGLE_FORM_ENTRY_ID_name, name.value)
    formData.append(GOOGLE_FORM_ENTRY_ID_mem, message.value)
    
    const response = await fetch(
      'https://docs.google.com/forms/d/e/1FAIpQLSdkTvSs1lYkxpp5BONOvnPWDh0gaHVx_b3zPMpgsdku20w1WQ/formResponse',
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      }
    )
    
    success.value = 'Message submitted successfully!'
    message.value = ''
    
  } catch (err) {
    console.error('Error submitting message:', err)
    error.value = 'Failed to submit message. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>