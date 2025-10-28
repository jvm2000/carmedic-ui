<script setup lang="ts">
import BaseButton from '../components/BaseButton.vue';
import BaseStep from '../components/BaseStep.vue';
import { useForm } from '../composables/useForm';

const { currentStep } = useForm()
</script>

<template>
  <div class="w-full relative web">
    <div class="w-full flex items-center justify-between bg-white px-24 py-4 fixed top-0 z-[9999]">
      <img src="/images/logo.png" alt="" class="h-16">

      <div>
        <BaseButton>
          Logout
        </BaseButton>
      </div>
    </div>

    <div class="flex flex-col items-center w-full py-40 space-y-8">
      <div class="max-w-4xl w-full flex flex-col items-start space-y-6">
        <div class="flex items-center gap-6">
          <BaseStep
            display="1"
            label="Customer Information"
            description="Edit your contact details"
            :selected="currentStep === 0"
          />

          <BaseStep
            display="2"
            label="Vehicle Details"
            description="Provide vehicle information and photos"
            :selected="currentStep === 1"
          />

          <BaseStep
            display="3"
            label="Schedule Deregistration"
            description="Choose appointment date and time"
          />

          <BaseStep
            display="4"
            label="Track Collection"
            description="Monitor your vehicle collection"
          />

          <BaseStep
            display="5"
            label="Payment"
            description="Receive your compensation"
          />
        </div>

        <div class="w-full">
          <slot />
        </div>
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