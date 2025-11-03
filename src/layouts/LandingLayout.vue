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
  </div>
</template>

<style scoped>
.web {
  background-color: #fffafa;
  min-height: 100vh;
}
</style>