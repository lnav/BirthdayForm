<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">All Messages</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Loading messages...</p>
      </div>
      
      <div v-else-if="error" class="bg-red-100 text-red-700 p-4 rounded-md">
        {{ error }}
      </div>
      
      <div v-else-if="messages.length === 0" class="text-center py-8">
        <p class="text-gray-500 text-lg">No messages yet. Be the first to post one!</p>
      </div>
      
      <div v-else class="space-y-4">
        <div
          v-for="message in messages"
          :key="message.id"
          class="border-b border-gray-200 pb-4 last:border-0"
        >
          <p class="text-gray-800">{{ message.content }}</p>
          <p class="text-sm text-gray-500 mt-2">
            {{ message.timestamp }}
          </p>
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

// Google Sheets API configuration
// You'll need to set up Google Sheets API and get an API key
const SHEETS_API_KEY = 'YOUR_API_KEY'
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'
const RANGE = 'Sheet1!A:B' // Adjust based on your sheet structure

const fetchMessages = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // Fetch data from Google Sheets
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${SHEETS_API_KEY}`
    )
    
    const data = await response.json()
    
    if (data.values && data.values.length > 1) {
      // Skip header row, convert to message objects
      messages.value = data.values.slice(1).map((row, index) => ({
        id: index,
        content: row[0] || '',
        timestamp: row[1] || new Date().toLocaleString()
      })).reverse() // Show newest first
    } else {
      messages.value = []
    }
  } catch (err) {
    console.error('Error fetching messages:', err)
    error.value = 'Failed to load messages. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMessages()
})
</script>