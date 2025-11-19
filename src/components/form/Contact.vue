<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import BaseButton from '../BaseButton.vue';
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, PencilIcon } from '@heroicons/vue/24/outline'
import { useAuth } from '../../composables/useAuth';
import { dbHelper } from '../../helpers/dbHelper';
import BaseInput from '../BaseInput.vue';
import { useForm } from '../../composables/useForm';
import type { User, UserForm } from '../../types';

const isDisabled = ref(false)
const user = ref<User | null>(null)
const { token } = useAuth()
const loading = ref(false)
const errors = ref<any>(null)
const { nextStep } = useForm()
const userForm = ref<UserForm>({
  email: '',
  full_name: '',
  phone_number: '',
  whatsapp_number: '',
  address: ''
})

async function fetchUserData() {
  const response = await dbHelper.get('/get', token.value ?? '')

  user.value = response

  initializeForm()
}

async function updateUser() {
  loading.value = true

  try {
    await dbHelper.put('/user/update', userForm.value, token.value ?? '');

    isDisabled.value = false

    fetchUserData()
  } catch (error: any) {
    errors.value = error.response.errors
  } finally {
    loading.value = false
  }
}

function initializeForm() {
  if (user.value) {
    userForm.value.full_name = user.value.full_name || ''
    userForm.value.email = user.value.email || ''
    userForm.value.phone_number = user.value.phone_number || ''
    userForm.value.whatsapp_number = user.value.whatsapp_number || ''
    userForm.value.address = user.value.address || ''
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
      v-model="userForm.full_name"
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
      v-model="userForm.email"
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
      v-model="userForm.phone_number"
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
      v-model="userForm.whatsapp_number"
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
      v-model="userForm.address"
      label="Full Address"
      placeholder="123, Jalan Example, 45678 City, Country"
      required
      :disabled="!isDisabled"
    >
      <template #icon>
        <MapPinIcon class="size-5 stroke-gray-800" />
      </template>
    </BaseInput>

    <BaseButton 
      v-if="isDisabled"
      :loading="loading"
      @click="updateUser"
    >Update</BaseButton>

    <BaseButton 
      v-if="!isDisabled"
      @click="nextStep()"
    >Continue to vehicle details</BaseButton>
  </div>
</template>