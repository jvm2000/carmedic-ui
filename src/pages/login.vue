<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue';
import BaseToast from '../components/BaseToast.vue';
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

const router = useRouter()
const type = ref('login')
const form = ref<SignUpForm>({
  email: '',
  full_name: '',
  phone_number: '',
  whatsapp_number: '',
  state: '',
  city: '',
  postal_code: '',
  street_adress: '',
  address: '',
  password: '',
  password_confirmation: ''
})
const loginForm = ref<LoginForm>({
  email: '',
  password: '',
})
const errors = ref<any>(null)
const loading = ref(false)
const { token } = useAuth()
const { currentStep, doneLoggedStep, setTitle } = useForm()
const typeError = ref('register')
const states = ref<any>([])
const toast = ref<InstanceType<typeof BaseToast> | null>(null)

async function register() {
  errors.value = null
  loading.value = true

  form.value.address = fullAddress.value

  try {
    await dbHelper.post('/register', form.value);

    type.value = 'login'
    clearForm()

    toast.value?.showToast("Account Registered Successfully")
  } catch (error: any) {
    errors.value = error.response?.errors
  } finally {
    loading.value = false
  }
}

async function login() {
  typeError.value = 'register'
  loading.value = true
  errors.value = null

  try {
    const response = await dbHelper.post('/login', loginForm.value);

    token.value = response.access_token

    await checkSteps()
    router.push('/dashboard')
  } catch (error: any) {
    if (error.response?.errors) {
      errors.value = error.response?.errors
    }

    if (!error.response?.errors) {
      typeError.value = 'login'

      errors.value = { message: [error.response?.message] }
    }
  } finally {
    loading.value = false
  }
}

async function checkSteps() {
  const response = await dbHelper.get('/getSteps', token.value ?? '');

  currentStep.value = response.step
  doneLoggedStep.value = response.step
}

function clearForm() {
  form.value = {
    email: '',
    full_name: '',
    phone_number: '',
    whatsapp_number: '',
    state: '',
    city: '',
    postal_code: '',
    street_adress: '',
    address: '',
    password: '',
    password_confirmation: ''
  }

  errors.value = null
}

async function getStates() {
  const response = await dbHelper.get('/states')

  states.value = response
}

function submitForm() {
  if (type.value === 'login') {
    login()

    return
  }

  register()
}

const fullAddress = computed(() => {
  return `${form.value.street_adress} ${form.value.city}, ${form.value.state}, ${form.value.postal_code}`
})

onMounted(() => getStates())

watchEffect(() => {
  setTitle('Login/Register')
})
</script>

<template>
  <div 
    class="w-full grid place-items-center web overflow-x-hidden"
    :class="[type === 'signup' ? 'py-8' : '']"
  >
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

        <form method="POST" @submit.prevent="submitForm" class="flex flex-col items-center space-y-8 w-full">
          <div v-if="type === 'login'" class="space-y-6 w-full">
            <BaseInput 
              v-model="loginForm.email"
              type="Email"
              label="Email"
              placeholder="your@email.com"
              :error="getError(errors, 'email')"
              required
            />

            <BaseInput 
              v-model="loginForm.password"
              type="password"
              label="Password"
              placeholder="**********"
              :error="typeError === 'login' ? getError(errors, 'message') : getError(errors, 'password')"
              required
            />
          </div>

          <div v-if="type === 'signup'" class="space-y-6 w-full">
            <BaseInput 
              v-model="form.email"
              type="email"
              label="Email"
              placeholder="your@email.com"
              :error="getError(errors, 'email')"
              required
            />

            <BaseInput 
              v-model="form.full_name"
              label="Full Name"
              placeholder="John Doe"
              :error="getError(errors, 'full_name')"
              required
            />

            <BaseInput 
              v-model="form.phone_number"
              label="Phone Number"
              placeholder="+60 000 000 000"
              :error="getError(errors, 'phone_number')"
              required
            />

            <BaseInput 
              v-model="form.whatsapp_number"
              label="Whatsapp Number"
              placeholder="+60 000 000 000"
              :error="getError(errors, 'whatsapp_number')"
              required
            />

            <BaseCombobox 
              v-model="form.state"
              :options="states"
              label="State"
              required
              :error="getError(errors, 'state')"
            />

            <div class="flex flex-col sm:flex-row sm:items-center gap-4">
              <BaseInput
                v-model="form.city"
                label="City"
                placeholder="City"
                required
                :error="getError(errors, 'city')"
              />

              <BaseInput
                v-model="form.postal_code"
                label="Postal Code"
                placeholder="Postal Code"
                required
                :error="getError(errors, 'postal_code')"
              />
            </div>

            <BaseInput
              v-model="form.street_adress"
              label="Address"
              placeholder="123, Jalan Example"
              required
              :error="getError(errors, 'street_adress')"
            />

            <BaseInput 
              v-model="form.password"
              type="password"
              label="Password"
              placeholder="**********"
              :error="getError(errors, 'password')"
              required
            />

            <BaseInput 
              v-model="form.password_confirmation"
              type="password"
              label="Confirm Password"
              placeholder="**********"
              :error="getError(errors, 'password')"
              required
            />
          </div>

          <BaseButton
            :loading
            isSubmitting
            @click="type === 'login' ? login() : register()">
          {{ type === 'login' ? 'Login' : 'Signup' }}</BaseButton>
        </form>
      </div>
    </div>
  </div>
  
  <BaseToast ref="toast" />
</template>

<style scoped>
.web {
  background-color: #fffafa;
  min-height: 100vh;
}
</style>