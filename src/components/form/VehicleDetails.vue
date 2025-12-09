<script setup lang="ts">
import { TruckIcon, XMarkIcon, PencilIcon } from '@heroicons/vue/24/outline'
import BaseInput from '../BaseInput.vue';
import { ArrowUpTrayIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
import BaseButton from '../BaseButton.vue';
import { useForm } from '../../composables/useForm';
import { useVehicle } from '../../composables/useVehicle';
import { computed, onMounted, ref } from 'vue';
import { dbHelper } from '../../helpers/dbHelper';
import { useAuth } from '../../composables/useAuth';
import { getError } from '../../helpers/errorHelper';
import BaseCombobox from '../BaseCombobox.vue';
import BaseToast from '../../components/BaseToast.vue';

const toast = ref<InstanceType<typeof BaseToast> | null>(null)
const { token } = useAuth()
const images = ref<any>([])
const previews = ref<string[]>([]) 
const loading = ref(false)
const errors = ref<any>(null)
const { currentStep, prevStep, vehicleForm: form, doneLoggedStep } = useForm()
const errorMessage = ref('')
const { vehicle } = useVehicle()
const makes = ref<any>([])
const isDisabled = ref(false)

async function getMakes() {
  const response = await dbHelper.get('/makes')

  makes.value = response
}

function uploadImage() {
  if (cannotEdit.value) return

  document.getElementById('profile-photo')?.click()
}

function removeImage(index: number) {
  if (images.value.length > 5) errorMessage.value = ''

  images.value.splice(index, 1)
  previews.value.splice(index, 1)
}

function handleFiles(event: Event) {
  const target = event.target as HTMLInputElement
  const files: any = target.files

  if (!files) return

  if (images.value.length + files.length > 5) {
    errorMessage.value = 'You can only upload a maximum of 5 images.'
    target.value = ''
    return
  }

  errorMessage.value = ''

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    images.value.push(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      previews.value.push(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  form.value.images = images.value

  target.value = ''
}

async function fetchVehicle() {
  const response = await dbHelper.get('/getVehicle', token.value ?? '')

  vehicle.value = response.data

  initializeForm()
}

function initializeForm() {
  if (vehicle.value) {
    form.value.plate_number = vehicle.value.plate_number || ''
    form.value.make = vehicle.value.make || ''
    form.value.model = vehicle.value.model || ''
    form.value.year = vehicle.value.year || ''
    form.value.registration_card_number = vehicle.value.registration_card_number || ''
    previews.value = vehicle.value.images.map((img: string) => {
      return `${import.meta.env.BASE_URL}/storage/${img}`
    })
  }

  return
}

async function submit() {
  if (vehicle.value) {
    window.scrollTo({ top: 0, behavior: 'auto' })

    currentStep.value += 1
    return
  }
  
  loading.value = true
  errors.value = null

  const formData = new FormData()

  formData.append('plate_number', form.value.plate_number || '')
  formData.append('make', form.value.make || '')
  formData.append('model', form.value.model || '')
  formData.append('year', form.value.year || '')
  formData.append('registration_card_number', form.value.registration_card_number || '')

  if (form.value.images && form.value.images.length > 0) {
    for (let i = 0; i < form.value.images.length; i++) {
      formData.append('images[]', form.value.images[i])
    }
  }

  try {
    await dbHelper.post('/vehicle', formData, token.value ?? '');

    currentStep.value += 1
  } catch (error: any) {
    errors.value = error.response.errors
  } finally {
    loading.value = false
  }
} 

async function update() {
  loading.value = true
  errors.value = null

  const formData = new FormData()

  formData.append('_method', 'PUT')

  formData.append('plate_number', form.value.plate_number)
  formData.append('make', form.value.make)
  formData.append('model', form.value.model)
  formData.append('year', form.value.year)
  formData.append('registration_card_number', form.value.registration_card_number)

  if (form.value.images && form.value.images.length > 0) {
    for (let i = 0; i < form.value.images.length; i++) {
      formData.append('images[]', form.value.images[i])
    }
  }

  try {
    await dbHelper.post(`/vehicle/${vehicle.value?.id}`, formData, token.value ?? '');

    isDisabled.value = false

    toast.value?.showToast("Vehicle Information Updated Successfully")
  } catch (error: any) {
    errors.value = error.response.errors
  } finally {
    loading.value = false
  }
}

function openEdit() {
  isDisabled.value = !isDisabled.value

  errors.value = null
}

const cannotEdit = computed(() => {
  if (doneLoggedStep.value > 1 && isDisabled.value) return true

  return false
})

onMounted(() => {
  getMakes(),
  fetchVehicle()
})
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

      <button v-if="!cannotEdit" class="flex items-center space-x-2" @click="openEdit">
        <PencilIcon class="size-4 stroke-gray-800" />
        
        <span class="text-base">Edit</span>
      </button>

      <button v-if="isDisabled" class="flex items-center" @click="openEdit">
        <span class="text-base">Cancel</span>
      </button>
    </div>

    <div class="grid grid-cols-2 gap-6 w-full">
      <div class="col-span-2 sm:col-span-1">
        <BaseCombobox 
          v-model="form.make"
          :options="makes"
          label="Brand"
          placeholder="Select a Brand"
          required
          :disabled="cannotEdit"
          :error="getError(errors, 'make')"
        />
      </div>

      <div class="col-span-2 sm:col-span-1">
        <BaseInput
          v-model="form.model"
          label="Model"
          placeholder="Camry"
          required
          :disabled="cannotEdit"
          :error="getError(errors, 'model')"
        />
      </div>

      <div class="col-span-2 sm:col-span-1">
        <BaseInput
          v-model="form.year"
          label="Year"
          placeholder="2020"
          required
          :disabled="cannotEdit"
          :error="getError(errors, 'year')"
        />
      </div>

      <div class="col-span-2 sm:col-span-1">
        <BaseInput
          v-model="form.plate_number"
          label="License Plate"
          placeholder="ABC-1234"
          required
          formatted
          :disabled="cannotEdit"
          :error="getError(errors, 'plate_number')"
        />
      </div>

      <div class="col-span-2">
        <BaseInput 
          v-model="form.registration_card_number"
          label="Registered Card Number"
          placeholder="1HGBVNXXMAS1098296"
          required
          uppercase
          :disabled="cannotEdit"
          :error="getError(errors, 'registration_card_number')"
        />
      </div>

      <div class="col-span-2 flex flex-col space-y-2">
        <div class="flex flex-col space-y-2 w-full">
          <div>
            <label class="text-base font-medium text-black">
              Vehicle Photos
              <span class="text-red-500">* </span>
              <span>(Max 5) </span>
            </label>

             <p class="text-red-500 font-medium">Note: When uploading photos it should be front, rear, left hand, right hand, and engine compartment</p>
          </div>

          <div 
            class="relative w-full border-dashed border-2 border-gray-400 rounded-lg grid place-items-center h-36"
            :class="[cannotEdit ? 'cursor-not-allowed' : 'cursor-pointer hover:border-red-500 ']"
             @click="uploadImage"
          >
            <div class="flex flex-col items-center space-y-0">
              <ArrowUpTrayIcon v-if="!cannotEdit" class="size-8 stroke-gray-600" />
              <LockClosedIcon v-if="cannotEdit" class="size-8 stroke-gray-600" />

              <span class="text-base text-gray-500">{{ cannotEdit ? 'Cannot edit' : 'Click to upload or drag and drop<'}}</span>
              <span v-if="!cannotEdit" class="text-sm text-gray-500">PNG, JPG up to  10MB each</span>
            </div>

            <input 
              id="profile-photo"
              type="file" 
              accept="image/*" 
              multiple 
              @change="handleFiles" class="hidden absolute" 
            />
          </div>

          <span v-if="getError(errors, 'images') || errorMessage" class="text-xs text-red-500">
            {{ getError(errors, 'images') ?? errorMessage }}
          </span>
        </div>

        <div class="flex items-center gap-5">
          <div 
            v-for="src, index in previews" 
            class="relative overflow-hidden w-56 h-36 rounded-lg"
            :key="index"
          >
            <img class="w-full object-cover" :src="src" alt="Vehicle Image Preview" />

            <div 
              v-if="!cannotEdit"
              class="bg-red-500 rounded-full size-6 grid place-items-center absolute top-1 right-1 cursor-pointer"
               @click="removeImage(index)"
            >
              <XMarkIcon class="size-4 stroke-white" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-2 sm:col-span-1">
        <BaseButton type="secondary" @click="prevStep">Back</BaseButton>
      </div>

      <div class="col-span-2 sm:col-span-1">
        <BaseButton
          v-if="cannotEdit"
          :loading="loading"
          @click="submit"
        >Continue to Schedule</BaseButton>

        <BaseButton 
          v-if="!cannotEdit"
          :loading="loading"
          @click="update"
        >Update</BaseButton>
      </div>
    </div>
  </div>

  <BaseToast ref="toast" />
</template>