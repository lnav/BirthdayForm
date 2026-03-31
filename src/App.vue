<template>
  <div class="min-h-screen bg-purple-300">
    <nav class="bg-purple-200 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex space-x-8">

            <router-link 
              to="/" 
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-colors duration-200"
              active-class="text-blue-600 border-b-2 border-blue-600"
            >
              Submit Message
            </router-link>

            <!-- <router-link 
              to="/messages" 
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-colors duration-200"
              active-class="text-blue-600 border-b-2 border-blue-600"
            >
              View Messages
            </router-link> -->

          </div>
        </div>
      </div>
    </nav>
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>