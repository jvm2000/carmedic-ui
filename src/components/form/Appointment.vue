<script setup lang="ts">
import { CalendarDaysIcon } from '@heroicons/vue/24/outline'
import BaseCalendar from '../BaseCalendar.vue';
import { onMounted, ref } from 'vue';
import BaseTextArea from '../BaseTextArea.vue';
import { useForm } from '../../composables/useForm';
import BaseButton from '../BaseButton.vue';
import { dbHelper } from '../../helpers/dbHelper';
import { useAuth } from '../../composables/useAuth';
import { useVehicle } from '../../composables/useVehicle';
import { useAppointment } from '../../composables/useAppointment';

type TimeSlot = {
  label: string,
  value: string,
}

const { prevStep, currentStep, appointmentForm: form } = useForm()
const { appointment } = useAppointment()
const selectedTime = ref<string>('')
const timeSlots: TimeSlot[] = [
  { label: '9:00 AM', value: '09:00:00' },
  { label: '10:00 AM', value: '10:00:00' },
  { label: '11:00 AM', value: '11:00:00' },
  { label: '12:00 PM', value: '12:00:00' },
  { label: '1:00 PM', value: '13:00:00' },
  { label: '2:00 PM', value: '14:00:00' },
  { label: '3:00 PM', value: '15:00:00' },
  { label: '4:00 PM', value: '16:00:00' },
]
const loading = ref(false)
const errors = ref<any>(null)
const { token } = useAuth()
const { vehicle } = useVehicle()

function selectTime(time: TimeSlot) {
  selectedTime.value = time.value ?? ''
}

async function submit() { 
  if (appointment.value) {
    window.scrollTo({ top: 0, behavior: 'auto' })
    
    currentStep.value += 1
    return
  }

  const dateObj = new Date()

  loading.value = true

  form.value.scheduled_date = dateObj.toISOString().split('T')[0] ?? ''
  form.value.scheduled_time = selectedTime.value ?? ''

  try {
    await dbHelper.post(`/appointment/${vehicle.value?.id}`, form.value, token.value ?? '');

    currentStep.value += 1
  } catch (error: any) {
    errors.value = error.response.errors
  } finally {
    loading.value = false
  }
}

async function fetchVehicle() {
  const { currentStep } = useForm()

  if (currentStep.value !== 2) return

  const response = await dbHelper.get('/getVehicle', token.value ?? '')

  vehicle.value = response.data

  initializeForm()
}

async function fetchAppointment() {
  await fetchVehicle()
  
  const { token } = useAuth()
  const { vehicle } = useVehicle()

  const response = await dbHelper.get(`/getAppointment/${vehicle.value?.id}`, token.value ?? '')

  appointment.value = response.data

  await initializeForm()
}

function initializeForm() {
  if (appointment.value) {
    form.value.scheduled_date = appointment.value.scheduled_date ?? ''
    selectedTime.value = appointment.value.scheduled_time ?? ''
    form.value.additional_notes = appointment.value.additional_notes ?? ''
  }

  return
}

onMounted(() => {
  fetchAppointment()
})
</script>

<template>
  <div class="w-full bg-white rounded-lg p-6 flex flex-col items-start space-y-6">
    <div class="w-full flex items-start justify-between">
      <div>
        <div class="flex items-center space-x-2">
          <CalendarDaysIcon class="size-6 stroke-red-500" />
          <h2 class="text-2xl font-semibold text-black">Schedule Appointment</h2>
        </div>

        <p class="text-base text-black">Choose a convenient date and time for doorstep deregistration</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 w-full gap-x-6">
      <BaseCalendar
        v-model="form.scheduled_date"
      />
    </div>

    <div class="flex flex-col space-y-2 w-full">
      <label class="text-base font-medium text-black">
        Select Time
        <span class="text-red-500">* </span>
      </label>

      <div class="flex flex-wrap gap-2">
        <button 
          v-for="time in timeSlots"
          :class="[
            'w-24 sm:w-48 justify-center py-2 text-sm sm:text-base rounded-md border transition-colors',
            selectedTime === time.value
              ? 'bg-red-500 text-white border-red-600'
              : 'bg-gray-50 text-black border-gray-300 hover:bg-gray-100'
          ]"
          @click="selectTime(time)"
        >
          {{ time.label }}
        </button>
      </div>
    </div>

    <BaseTextArea
      v-model="form.additional_notes"
      label="Additional Notes"
      placeholder="Please kindly a note here if possible."
      required
    />

    <div class="grid grid-cols-2 gap-6 w-full">
      <div class="col-span-2 sm:col-span-1">
        <BaseButton type="secondary" @click="prevStep">Back</BaseButton>
      </div>

      <div class="col-span-2 sm:col-span-1">
        <BaseButton @click="submit">Continue to Track Collection</BaseButton>
      </div>
    </div>
  </div>
</template>