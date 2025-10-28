<script setup lang="ts">
import { TruckIcon } from '@heroicons/vue/24/outline'
import BaseInput from '../BaseInput.vue';
</script>

<template>
  <div class="w-full bg-white rounded-lg p-6 flex flex-col items-start space-y-6">
    <div class="w-full flex items-start justify-between">
      <div>
        <div class="flex items-center space-x-2">
          <TruckIcon class="size-6 stroke-red-500" />
          <h2 class="text-2xl font-semibold text-black">Vehicle Details</h2>
        </div>

        <p class="text-base text-black">Tell us about your vehicle and upload photos</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6 w-full">
      <BaseInput
        label="Make"
        placeholder="Toyota"
        required
      />

      <BaseInput
        label="Model"
        placeholder="Camry"
        required
      />
    </div>
  </div>
</template>