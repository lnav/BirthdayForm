<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <form @submit.prevent="submitMessage">
      <div class="mb-4">
        <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
          Your Message
        </label>
        <textarea
          id="message"
          v-model="message"
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Write your message here..."
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
        :disabled="loading || !message.trim()"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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

// REPLACE THESE WITH YOUR ACTUAL GOOGLE FORM DETAILS
const GOOGLE_FORM_ID = 'YOUR_FORM_ID'
const GOOGLE_FORM_ENTRY_ID = 'entry.123456789' // Replace with your actual entry ID

const message = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const submitMessage = async () => {
  if (!message.value.trim()) return
  
  loading.value = true
  error.value = ''
  success.value = ''
  
  try {
    // Method 1: Direct form submission (works with CORS)
    const formData = new URLSearchParams()
    formData.append(GOOGLE_FORM_ENTRY_ID, message.value)
    
    // Using fetch to submit to Google Forms
    const response = await fetch(
      `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`,
      {
        method: 'POST',
        mode: 'no-cors', // Important: Google Forms doesn't support CORS
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      }
    )
    
    // Since we're using no-cors, we can't check response status
    // We'll assume success if no error was thrown
    
    success.value = 'Message submitted successfully!'
    message.value = ''
    
    // Redirect to messages page after 1.5 seconds
    setTimeout(() => {
      router.push('/messages')
    }, 1500)
    
  } catch (err) {
    console.error('Error submitting message:', err)
    error.value = 'Failed to submit message. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>