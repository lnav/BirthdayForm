<template>
  <div class="max-w-2xl mx-auto">
    <CountdownTimer class="mb-8"/>
    <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 mb-8 text-white">
      <p class="text-l font-bold mb-4 text-center">
        All of those who have been blessed with the presence of my girlfriend, Annanya, will know how funny, smart and loyal she is. 
        This year for her birthday I wanted to collect some memories from all of her friends to show her how loved she is.
        So, whether it's a time she made you laugh so hard you almost peed or a time she helped you in a jam, leave it below.
      </p>
      <p class="text-l font-bold mb-4 text-center text-red-600">
        Notice: If Annanya becomes aware of this site before her birthday you will be liable to prosecution, by reading this you are sworn to secrecy. 
        <br /> Thank you.
      </p>
    </div>
    <MessageForm />
  </div>
</template>

<script setup>
import CountdownTimer from '../components/CountdownTimer.vue';
import MessageForm from '../components/MessageForm.vue'
</script>