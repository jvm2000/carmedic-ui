import { ref } from "vue";
import type { AppointmentForm, SignUpForm, VehicleForm } from '../types';

const currentStep = ref(0)
const signupForm = ref<SignUpForm>({
  email: '',
  full_name: '',
  phone_number: '',
  whatsapp_number: '',
  address: '',
})
const vehicleForm = ref<VehicleForm>({
  plate_number: '',
  make: '',
  model: '',
  year: '',
  registration_card_number: '',
  images: [],
})
const appointmentForm = ref<AppointmentForm>({
  scheduled_date: '',
  scheduled_time: '',
  additional_notes: '',
})

export function useForm() {
  function nextStep() {
    currentStep.value += 1
  }

  function prevStep() {
    currentStep.value -= 1
  }

  return {
    currentStep,
    appointmentForm,
    signupForm,
    vehicleForm,
    nextStep,
    prevStep
  };
}