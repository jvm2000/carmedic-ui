<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import BaseButton from '../BaseButton.vue';
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, PencilIcon } from '@heroicons/vue/24/outline'
import type { SignUpForm, User } from '../../types';
import { useAuth } from '../../composables/useAuth';
import { dbHelper } from '../../helpers/dbHelper';
import BaseInput from '../BaseInput.vue';
import { useForm } from '../../composables/useForm';

const isDisabled = ref(false)
const user = ref<User | null>(null)
const form = ref<SignUpForm>({
  email: '',
  full_name: '',
  phone_number: '',
  whatsapp_number: '',
  address: '',
})
const { token } = useAuth()
const { nextStep } = useForm()

async function fetchUserData() {
  const response = await dbHelper.get('/get', token.value ?? '')

  user.value = response

  await initializeForm()
}

function initializeForm() {
  if (user.value) {
    form.value.full_name = user.value.full_name || ''
    form.value.email = user.value.email || ''
    form.value.phone_number = user.value.phone_number || ''
    form.value.whatsapp_number = user.value.whatsapp_number || ''
    form.value.address = user.value.address || ''
  }

  return
}

onBeforeMount(() => {
  fetchUserData()
})
</script>

<template>
  <div class="w-full bg-white rounded-lg p-6 flex flex-col items-start space-y-6">
    <div class="w-full flex items-start justify-between">
      <div>
        <div class="flex items-center space-x-2">
          <UserIcon class="size-6 stroke-red-500" />
          <h2 class="text-2xl font-semibold text-black">Customer Information</h2>
        </div>

        <p class="text-base text-black">Please provide your contact details to get started</p>
      </div>

      <button v-if="!isDisabled" class="flex items-center space-x-2" @click="isDisabled = true">
        <PencilIcon class="size-4 stroke-gray-800" />
        
        <span class="text-base">Edit</span>
      </button>

      <button v-if="isDisabled" class="flex items-center" @click="isDisabled = false">
        <span class="text-base">Cancel</span>
      </button>
    </div>

    <BaseInput
      v-model="form.full_name"
      label="Full Name"
      placeholder="John Doe"
      required
      :disabled="!isDisabled"
    >
      <template #icon>
        <UserIcon class="size-5 stroke-gray-800" />
      </template>
    </BaseInput>

    <BaseInput
      v-model="form.email"
      label="Email Address"
      placeholder="Enter your email address"
      required
      :disabled="!isDisabled"
    >
      <template #icon>
        <EnvelopeIcon class="size-5 stroke-gray-800" />
      </template>
    </BaseInput>

    <BaseInput
      v-model="form.phone_number"
      label="Phone"
      placeholder="+60 000 000 000"
      required
      :disabled="!isDisabled"
    >
      <template #icon>
        <PhoneIcon class="size-5 stroke-gray-800" />
      </template>
    </BaseInput>

    <BaseInput
      v-model="form.whatsapp_number"
      label="Whatsapp Number"
      placeholder="+60 000 000 000"
      required
      :disabled="!isDisabled"
    >
      <template #icon>
        <PhoneIcon class="size-5 stroke-gray-800" />
      </template>
    </BaseInput>

    <BaseInput
      v-model="form.address"
      label="Full Address"
      placeholder="123, Jalan Example, 45678 City, Country"
      required
      :disabled="!isDisabled"
    >
      <template #icon>
        <MapPinIcon class="size-5 stroke-gray-800" />
      </template>
    </BaseInput>

    <BaseButton v-if="isDisabled">Update</BaseButton>

    <BaseButton 
      v-if="!isDisabled"
      @click="nextStep()"
    >Continue to vehicle details</BaseButton>
  </div>
</template>