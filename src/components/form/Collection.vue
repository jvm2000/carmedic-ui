<script setup lang="ts">
import { TruckIcon, MapPinIcon, CheckCircleIcon, ClockIcon, ChatBubbleLeftIcon } from '@heroicons/vue/24/outline'
import { useForm } from '../../composables/useForm';
import BaseButton from '../BaseButton.vue';

const { prevStep } = useForm()
</script>

<template>
  <div class="w-full bg-white rounded-lg p-6 px-4 sm:px-6 flex flex-col items-start space-y-6">
    <div class="w-full flex items-start justify-between">
      <div>
        <div class="flex items-center space-x-2">
          <TruckIcon class="size-6 stroke-red-500" />
          <h2 class="text-2xl font-semibold text-black">Track Collection</h2>
        </div>

        <p class="text-base text-black">Monitor your vehicle collection</p>
      </div>
    </div>

    <div class="px-4 py-4 border-l-4 border-red-500 bg-red-50 flex items-start space-x-2 w-full">
      <MapPinIcon class="size-6 stroke-red-500" />

      <div class="flex flex-col space-y-0">
        <h3 class="text-base font-medium text-black">Collection Address</h3>

        <p class="text-gray-600 text-sm">We'll collect your vehicle from the address provided</p>
      </div>
    </div>

    <div class="justify-start space-y-8">
      <div class="flex items-center space-x-4">
        <div class="size-12 grid place-items-center bg-green-500 rounded-full">
          <CheckCircleIcon class="size-8 stroke-white" />
        </div>

        <div>
          <p class="text-base text-black font-medium">Appointment Confirmed</p>
          <p class="text-base text-gray-800">Your appointment has been scheduled</p>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <div class="size-12 grid place-items-center bg-red-500 rounded-full">
          <ClockIcon class="size-8 stroke-white" />
        </div>

        <div>
          <p class="text-base text-black font-medium">Awaiting Collection</p>
          <p class="text-base text-gray-800">Scheduled for November 6th, 2025 at 10:00 AM</p>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <div class="size-12 grid place-items-center bg-gray-100 rounded-full">
          <TruckIcon class="size-8 stroke-gray-800" />
        </div>

        <div>
          <p class="text-base text-black font-medium">Vehicle Collection</p>
          <p class="text-base text-gray-800">Our team will arrive at your doorstep</p>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <div class="size-12 grid place-items-center bg-gray-100 rounded-full">
          <CheckCircleIcon class="size-8 stroke-gray-800" />
        </div>

        <div>
          <p class="text-base text-black font-medium">Deregistration Complete</p>
          <p class="text-base text-gray-800">Process completed and documented</p>
        </div>
      </div>
    </div>

    <div class="bg-gray-100 w-full p-4 rounded-lg flex flex-col items-start space-y-3">
      <div class="flex items-center space-x-2">
        <ChatBubbleLeftIcon class="size-4 stroke-red-500" />

        <p class="text-black font-medium text-sm">
          Need help?
        </p>
      </div>

      <span class="text-sm text-gray-800">
        Contact us via WhatsApp for real-time updates and support
      </span>

      <button class="bg-green-500 rounded-lg flex gap-4 items-center w-full p-4 justify-center">
        <ChatBubbleLeftIcon class="size-6 stroke-white" />

        <span class="text-white text-sm font-medium">Chat on WhatsApp</span>
      </button>
    </div>

    <div class="grid grid-cols-2 gap-6 w-full">
      <div class="col-span-2 sm:col-span-1">
        <BaseButton type="secondary" @click="prevStep">Back</BaseButton>
      </div>

      <div class="col-span-2 sm:col-span-1">
        <BaseButton>Continue to Payment</BaseButton>
      </div>
    </div>
  </div>
</template>