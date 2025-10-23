<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';

const type = ref('login')
</script>

<template>
  <div class="w-full grid place-items-center web overflow-x-hidden">
    <div class="flex flex-col items-center space-y-8 w-full">
      <img src="/images/logo.png" alt="" class="h-16">

      <div class="max-w-lg w-full rounded-lg shadow-sm p-6 flex flex-col items-start space-y-6 border border-red-200 bg-white">
        <div>
          <h2 class="text-lg font-bold">Welcome</h2>

          <span class="text-base text-gray-700">Login or create an account to continue</span>
        </div>

        <div class="w-full flex items-center bg-gray-100 rounded-lg p-1.5">
          <button 
            class="p-1.5 text-center0 w-full"
            :class="[type === 'login' ? 'bg-gray-50 text-black font-medium' : 'text-gray-500']"
            @click="type = 'login'"
          >Login</button>
          <button 
            class="p-1.5 text-center w-full"
            :class="[type === 'signup' ? 'bg-gray-50 text-black font-medium' : 'text-gray-500']"
            @click="type = 'signup'"
          >Signup</button>
        </div>

        <div v-if="type === 'login'" class="space-y-6 w-full">
          <BaseInput 
            type="Email"
            label="Email"
            placeholder="your@email.com"
          />

          <BaseInput 
            type="password"
            label="Password"
            placeholder="**********"
          />
        </div>

        <div v-if="type === 'signup'" class="space-y-6 w-full">
          <BaseInput 
            type="email"
            label="Email"
            placeholder="your@email.com"
          />

          <BaseInput 
            label="Full Name"
            placeholder="John Doe"
          />

          <BaseInput 
            type="number"
            label="Phone Number"
            placeholder="00000000"
            min="12"
            max="12"
          />

          <BaseInput 
            type="number"
            label="Whatsapp Number"
            placeholder="00000000"
            min="12"
            max="12"
          />

          <BaseInput 
            type="password"
            label="Password"
            placeholder="**********"
          />
        </div>

        <BaseButton>{{ type === 'login' ? 'Login' : 'Signup' }}</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.web {
  background-color: #fffafa;
  min-height: 100vh;
}
</style>