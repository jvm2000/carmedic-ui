<script setup lang="ts">
import BaseButton from '../components/BaseButton.vue'
</script>

<template>
  <div class="w-full relative web">
    <div class="w-full flex items-center justify-between bg-white px-24 py-4 fixed top-0 z-[9999]">
      <img src="/images/logo.png" alt="" class="h-16">

      <div class="flex items-center gap-4">
        <a href="" class="text-base text-black">How It Works</a>
        <a href="" class="text-base text-black">Services</a>
        <a href="" class="text-base text-black">Contact Us</a>
      </div>

      <div>
        <BaseButton>
          Login
        </BaseButton>
      </div>
    </div>

    <div class="mt-24">
      <slot />
    </div>

    <div class="bg-gray-900 py-12 px-24 flex flex-col items-center space-y-6 divide-y divide-gray-50/10 w-full">
      <div class="grid grid-cols-3 w-full">
        <div class="flex flex-col items-start space-y-6">
          <img src="/images/logo.png" alt="" class="h-16">

          <p class="text-base text-white max-w-sm">Making vehicle deregistration simple, fast, and stress-free.</p>
        </div>

        <div class="flex flex-col items-start space-y-6">
          <p class="text-base text-white font-bold">Quick Links</p>

          <div class="space-y-4">
            <p class="text-base text-white">How It Works</p>
            <p class="text-base text-white">Services</p>
            <p class="text-base text-white">Get Started</p>
          </div>
        </div>

        <div class="flex flex-col items-start space-y-6">
          <p class="text-base text-white font-bold">Contact Us</p>

          <div class="space-y-4">
            <p class="text-base text-white">Email: office@carmedic.com.my</p>
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