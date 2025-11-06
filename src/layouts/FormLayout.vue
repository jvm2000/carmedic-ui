<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseButton from '../components/BaseButton.vue';
import BaseStep from '../components/BaseStep.vue';
import { useAuth } from '../composables/useAuth';
import { useForm } from '../composables/useForm';
import { dbHelper } from '../helpers/dbHelper';
import { ref, watchEffect } from 'vue';

const { currentStep, setTitle, titleChuck } = useForm()
const { token } = useAuth()
const router = useRouter()
const loading = ref(false)

async function logout() {
  loading.value = true

  await dbHelper.post('/logout', {}, token.value ?? '');

  token.value = null

  loading.value = false

  router.push('/')
} 

watchEffect(() => {
  setTitle(`${titleChuck.value}`)
})
</script>

<template>
  <div class="w-full relative web">
    <div class="w-full flex items-center justify-between bg-white px-6 md:px-12 lg:px-24 py-4 fixed top-0 z-[9999]">
      <img src="/images/logo.png" alt="" class="h-16 hidden sm:block">
      <img src="/images/logo_mobile.png" alt="" class="h-16 block sm:hidden">

      <div>
        <BaseButton 
          :loading="loading"
          @click="logout"
        >
          Logout
        </BaseButton>
      </div>
    </div>

    <div class="flex flex-col items-center w-full py-40 space-y-8">
      <div class="max-w-4xl w-full flex flex-col items-start space-y-6">
        <div class="flex items-start gap-6 px-2 sm:px-0">
          <BaseStep
            display="1"
            label="Customer Information"
            description="Edit your contact details"
            :selected="currentStep === 0"
            :is-done="currentStep > 0 || doneLoggedStep > 0"
            :class="[currentStep !== 0 ? 'hidden sm:flex' : 'flex']"
          />

          <BaseStep
            display="2"
            label="Vehicle Details"
            description="Provide vehicle information and photos"
            :selected="currentStep === 1"
            :is-done="currentStep > 1 || doneLoggedStep > 1"
            :class="[currentStep !== 1 ? 'hidden sm:flex' : 'flex']"
          />

          <BaseStep
            display="3"
            label="Schedule Deregistration"
            description="Choose appointment date and time"
            :selected="currentStep === 2"
            :is-done="currentStep > 2 || doneLoggedStep > 2"
            :class="[currentStep !== 2 ? 'hidden sm:flex' : 'flex']"
          />

          <BaseStep
            display="4"
            label="Track Collection"
            description="Monitor your vehicle collection"
            :selected="currentStep === 3"
            :is-done="currentStep > 3 || doneLoggedStep > 3"
            :class="[currentStep !== 3 ? 'hidden sm:flex' : 'flex']"
          />

          <BaseStep
            display="5"
            label="Payment"
            description="Receive your compensation"
            :selected="currentStep === 4"
            :is-done="currentStep > 4"
            :class="[currentStep !== 4 ? 'hidden sm:flex' : 'flex']"
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