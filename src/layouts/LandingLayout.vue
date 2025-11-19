<script setup lang="ts">
import BaseButton from '../components/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToLogin() {
  router.push('/login')
}
</script>

<template>
  <div class="w-full relative web">
    <div class="w-full flex items-center justify-between bg-white px-6 md:px-12 lg:px-24 py-4 fixed top-0 z-[9999]">
      <img src="/images/logo.png" alt="" class="h-16 hidden sm:block">
      <img src="/images/logo_mobile.png" alt="" class="h-16 block sm:hidden">

      <div>
        <BaseButton @click="goToLogin">
          Login/Register
        </BaseButton>
      </div>
    </div>

    <div class="mt-24">
      <slot />
    </div>

    <div class="bg-gray-900 pt-6 pb-8 px-6 md:px-12 lg:px-24 flex flex-col items-center space-y-6 divide-y divide-gray-50/10 w-full">
      <div class="grid grid-cols-1 sm:grid-cols-2 w-full gap-6 lg:gap-0">
        <div class="flex flex-col items-start space-y-6">
          <img src="/images/logo_mobile.png" alt="" class="h-16 hidden sm:block">
          <img src="/images/logo_mobile.png" alt="" class="h-24 block sm:hidden">

          <p class="text-base text-white max-w-sm">Making vehicle deregistration simple, fast, and stress-free.</p>
        </div>

        <div class="flex flex-col items-start space-y-6">
          <p class="text-base text-white font-bold">Contact Us</p>

          <div class="space-y-4">
            <a href="mailto:office@carmedic.com.my" class="text-base text-white">
              Email: office@carmedic.com.my
            </a>
            <p class="text-base text-white">Phone: 03-8920 7555</p>
          </div>
        </div>
      </div>

      <p class="text-base text-gray-50 w-full text-center pt-8">
        © 2025 Car Medic Malaysia. All rights reserved.
      </p>
    </div>
  </div>
</template>

<style scoped>
.web {
  background-color: #fffafa;
  min-height: 100vh;
}
</style>