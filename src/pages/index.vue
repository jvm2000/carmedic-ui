<script setup lang="ts">
import BaseButton from '../components/BaseButton.vue';
import LandingLayout from '../layouts/LandingLayout.vue';
import { CheckCircleIcon, TruckIcon, BanknotesIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <LandingLayout>
    <div class="py-24 w-full flex flex-col items-center space-y-8">
      <p class="text-7xl text-black font-bold text-center max-w-5xl">
        How to Deregister and Dispose of Your Car
      </p>

      <p class="text-3xl text-red-500 font-bold max-w-4xl text-center">
        If you need to deregister and dispose of your car, we've made the process simple and stress-free. Just follow these easy steps:
      </p>

      <div>
        <BaseButton class="rounded-full">Get Started</BaseButton>
      </div>
    </div>

    <div class="py-12 grid grid-cols-3 gap-6 px-24">
      <div class="w-full bg-white rounded-lg p-6 border-t-8 border-red-500 h-80 shadow-md flex flex-col items-start justify-between">
        <div class="size-20 bg-red-500 grid place-items-center rounded-full">
          <span class="text-4xl text-white font-bold">1</span>
        </div>

        <div class="space-y-4 justify-start">
          <p class="text-2xl font-bold text-black">Schedule An Appointment</p>

          <p class="text-base text-black">
            Fill out our simple online form with your vehicle and contact details
          </p>
        </div>
      </div>

      <div class="w-full bg-white rounded-lg p-6 border-t-8 border-blue-500 h-80 shadow-md flex flex-col items-start justify-between">
        <div class="size-20 bg-blue-500 grid place-items-center rounded-full">
          <span class="text-4xl text-white font-bold">2</span>
        </div>

        <div class="space-y-4 justify-start">
          <p class="text-2xl font-bold text-black">Keep In Touch</p>

          <p class="text-base text-black">
            We'll contact you to confirm details and answer any questions
          </p>
        </div>
      </div>

      <div class="w-full bg-white rounded-lg p-6 border-t-8 border-teal-500 h-80 shadow-md flex flex-col items-start justify-between">
        <div class="size-20 bg-teal-500 grid place-items-center rounded-full">
          <span class="text-4xl text-white font-bold">3</span>
        </div>

        <div class="space-y-4 justify-start">
          <p class="text-2xl font-bold text-black">Arrange An Appointment</p>

          <p class="text-base text-black">
            Choose a convenient date and time for vehicle collection
          </p>
        </div>
      </div>

      <div class="w-full bg-white rounded-lg p-6 border-t-8 border-purple-500 h-80 shadow-md flex flex-col items-start justify-between">
        <div class="size-20 bg-purple-500 grid place-items-center rounded-full">
          <span class="text-4xl text-white font-bold">4</span>
        </div>

        <div class="space-y-4 justify-start">
          <p class="text-2xl font-bold text-black">Free Vehicle Collection</p>

          <p class="text-base text-black">
            We come to your doorstep - no need to transport the vehicle yourself
          </p>
        </div>
      </div>

      <div class="w-full bg-white rounded-lg p-6 border-t-8 border-pink-500 h-80 shadow-md flex flex-col items-start justify-between">
        <div class="size-20 bg-pink-500 grid place-items-center rounded-full">
          <span class="text-4xl text-white font-bold">5</span>
        </div>

        <div class="space-y-4 justify-start">
          <p class="text-2xl font-bold text-black">Receive Your Payment</p>

          <p class="text-base text-black">
            Get instant compensation directly transferred to your account
          </p>
        </div>
      </div>

      <div class="w-full bg-white rounded-lg p-6 border-t-8 border-violet-500 h-80 shadow-md flex flex-col items-start justify-between">
        <div class="size-20 bg-violet-500 grid place-items-center rounded-full">
          <span class="text-4xl text-white font-bold">6</span>
        </div>

        <div class="space-y-4 justify-start">
          <p class="text-2xl font-bold text-black">Certificate of Destruction</p>

          <p class="text-base text-black">
            Receive official documentation confirming your vehicle deregistration
          </p>
        </div>
      </div>
    </div>

    <div class="py-16 bg-white flex flex-col items-center space-y-16 w-full">
      <p class="text-5xl text-black font-bold">Why Choose Us?</p>

      <div class="max-w-6xl w-full grid grid-cols-3 gap-x-8">
        <div class="flex flex-col items-center space-y-6">
          <div class="size-20 bg-red-500 grid place-items-center rounded-full">
            <CheckCircleIcon class="size-14 stroke-white" />
          </div>

          <p class="text-black font-bold text-3xl">Fast & Easy</p>

          <p class="text-xl text-gray-900 text-center">
            Complete the entire process in just 6 simple steps from the comfort of your home
          </p>
        </div>

        <div class="flex flex-col items-center space-y-6">
          <div class="size-20 bg-blue-500 grid place-items-center rounded-full">
            <TruckIcon class="size-12 stroke-white" />
          </div>

          <p class="text-black font-bold text-3xl">Free Collection</p>

          <p class="text-xl text-gray-900 text-center">
            No hidden fees or charges - we come to your doorstep at no extra cost
          </p>
        </div>

        <div class="flex flex-col items-center space-y-6">
          <div class="size-20 bg-green-500 grid place-items-center rounded-full">
            <BanknotesIcon class="size-12 stroke-white" />
          </div>

          <p class="text-black font-bold text-3xl">Instant Payment</p>

          <p class="text-xl text-gray-900 text-center">
            Receive your compensation immediately upon vehicle collection
          </p>
        </div>
      </div>
    </div>

    <div class="py-16 bg-red-500 flex flex-col items-center w-full space-y-8">
      <p class="text-5xl font-bold text-white">Ready to Get Started?</p>

      <p class="text-xl text-center text-white max-w-2xl">
        Join thousands of satisfied customers who have deregistered their vehicles with us
      </p>
    </div>
  </LandingLayout>
</template>