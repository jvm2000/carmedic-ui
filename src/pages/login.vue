<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseCombobox from '../components/BaseCombobox.vue';
import { dbHelper } from '../helpers/dbHelper';
import { getError } from '../helpers/errorHelper';
import { useAuth } from '../composables/useAuth';
import type { SignUpForm } from '../types';
import { useRouter } from 'vue-router';
import { useForm } from '../composables/useForm';

type LoginForm = {
  email: string,
  password: string,
}

type AddressForm = {
  state: string,
  city: string,
  postal_code: string,
  street_adress: string,
}

const router = useRouter()
const type = ref('login')
const form = ref<SignUpForm>({
  email: '',
  full_name: '',
  phone_number: '',
  whatsapp_number: '',
  address: '',
  password: '',
  password_confirmation: ''
})
const addressForm = ref<AddressForm>({
  state: '',
  city: '',
  postal_code: '',
  street_adress: ''
})
const loginForm = ref<LoginForm>({
  email: '',
  password: '',
})
const errors = ref<any>(null)
const loading = ref(false)
const { token } = useAuth()
const { currentStep } = useForm()

async function register() {
  loading.value = true

  form.value.address = fullAddress.value

  type.value = 'login'
  clearForm()
  try {
    await dbHelper.post('/register', form.value);

    type.value = 'login'
  } catch (error: any) {
    errors.value = error.response.errors
  } finally {
    loading.value = false
  }
}

async function login() {
  loading.value = true
  errors.value = null

  try {
    const response = await dbHelper.post('/login', loginForm.value);

    token.value = response.access_token

    await checkSteps()
    router.push('/dashboard')
  } catch (error: any) {
    errors.value = error.response.errors
  } finally {
    loading.value = false
  }
}

async function checkSteps() {
  const response = await dbHelper.get('/getSteps', token.value ?? '');

  currentStep.value = response.step
}

function clearForm() {
  form.value = {
    email: '',
    full_name: '',
    phone_number: '',
    whatsapp_number: '',
    address: '',
    password: '',
    password_confirmation: ''
  }

  addressForm.value = {
    state: '',
    city: '',
    postal_code: '',
    street_adress: ''
  }

  errors.value = null
}

const fullAddress = computed(() => {
  return `${addressForm.value.street_adress} ${addressForm.value.city}, ${addressForm.value.state}, ${addressForm.value.postal_code}`
})
</script>

<template>
  <div class="w-full grid place-items-center web overflow-x-hidden">
    <div class="flex flex-col items-center space-y-8 w-full">
      <img src="/images/logo.png" alt="" class="h-16">

      <div class="max-w-lg w-full rounded-lg shadow-sm p-6 flex flex-col items-start space-y-6 border border-red-200 bg-white">
        <div>
          <h2 class="text-lg font-bold">Welcome</h2>

          <span class="text-base text-gray-700">Login or create an account to continue</span>
        </div>

        <div class="w-full flex items-center bg-gray-100 rounded-lg p-1.5">
          <button 
            class="p-1.5 text-center0 w-full"
            :class="[type === 'login' ? 'bg-gray-50 text-black font-medium' : 'text-gray-500']"
            @click="type = 'login'"
          >Login</button>
          <button 
            class="p-1.5 text-center w-full"
            :class="[type === 'signup' ? 'bg-gray-50 text-black font-medium' : 'text-gray-500']"
            @click="type = 'signup'"
          >Signup</button>
        </div>

        <div v-if="type === 'login'" class="space-y-6 w-full">
          <BaseInput 
            v-model="loginForm.email"
            type="Email"
            label="Email"
            placeholder="your@email.com"
            :error="getError(errors, 'email')"
          />

          <BaseInput 
            v-model="loginForm.password"
            type="password"
            label="Password"
            placeholder="**********"
            :error="getError(errors, 'password')"
          />
        </div>

        <div v-if="type === 'signup'" class="space-y-6 w-full">
          <BaseInput 
            v-model="form.email"
            type="email"
            label="Email"
            placeholder="your@email.com"
            :error="getError(errors, 'email')"
          />

          <BaseInput 
            v-model="form.full_name"
            label="Full Name"
            placeholder="John Doe"
            :error="getError(errors, 'full_name')"
          />

          <BaseInput 
            v-model="form.phone_number"
            label="Phone Number"
            placeholder="+60 000 000 000"
            :error="getError(errors, 'phone_number')"
          />

          <BaseInput 
            v-model="form.whatsapp_number"
            label="Whatsapp Number"
            placeholder="+60 000 000 000"
            :error="getError(errors, 'whatsapp_number')"
          />

          <BaseCombobox 
            v-model="addressForm.state"
            label="State"
          />

          <div class="flex items-center gap-4">
            <BaseInput
              v-model="addressForm.city"
              label="City"
              placeholder="City"
            />

            <BaseInput
              v-model="addressForm.postal_code"
              label="Postal Code"
              placeholder="Postal Code"
            />
          </div>

          <BaseInput
            v-model="addressForm.street_adress"
            label="Address"
            placeholder="123, Jalan Example"
          />

          <BaseInput 
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="**********"
            :error="getError(errors, 'password')"
          />

          <BaseInput 
            v-model="form.password_confirmation"
            type="password"
            label="Confirm Password"
            placeholder="**********"
            :error="getError(errors, 'password')"
          />
        </div>

        <BaseButton
          :loading
          @click="type === 'login' ? login() : register()">
        {{ type === 'login' ? 'Login' : 'Signup' }}</BaseButton>
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