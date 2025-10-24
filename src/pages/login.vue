<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseCombobox from '../components/BaseCombobox.vue';
import { dbHelper } from '../helpers/dbHelper';
import { getError } from '../helpers/errorHelper';

type LoginForm = {
  email: string,
  full_name: string,
  phone_number: string,
  whatsapp_number: string,
  address: string | undefined,
  password: string,
  password_confirmation: string
}

type AddressForm = {
  state: string,
  city: string,
  postal_code: string,
  street_adress: string,
}

const type = ref('login')
const form = ref<LoginForm>({
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
const errors = ref<any>(null)
const loading = ref(false)

async function register() {
  loading.value = true
  errors.value = null

  form.value.address = fullAddress.value

  try {
    await dbHelper.post('/register', form.value);
  } catch (error: any) {
    errors.value = error.response.errors
  } finally {
    loading.value = false
  }
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
            type="Email"
            label="Email"
            placeholder="your@email.com"
            :error="getError(errors, 'email')"
          />

          <BaseInput 
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
            placeholder="00000000"
            min="12"
            max="12"
            :error="getError(errors, 'phone_number')"
          />

          <BaseInput 
            v-model="form.whatsapp_number"
            label="Whatsapp Number"
            placeholder="00000000"
            min="12"
            max="12"
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
            placeholder="Street Address"
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
          @click="register">
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