import { computed, ref } from "vue";
import type { AppointmentForm, SignUpForm, VehicleForm } from '../types';
import { useCookie } from "./useCookie";

const currentStep = useCookie('current-step', 0)
const doneLoggedStep = useCookie('done-logged-step', 0)

const signupForm = ref<SignUpForm>({
  email: '',
  full_name: '',
  phone_number: '',
  whatsapp_number: '',
  state: '',
  city: '',
  postal_code: '',
  street_adress: '',
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

const titleChuck = computed(() => {
  if (currentStep.value === 0) return 'Customer Information'
  if (currentStep.value === 1) return 'Vehicle Details'
  if (currentStep.value === 2) return 'Schedule Deregistration'
  if (currentStep.value === 3) return 'Track Collection'
})

export function useForm() {
  function nextStep() {
    currentStep.value += 1

    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  function prevStep() {
    currentStep.value -= 1

    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  function setTitle(titleChunk: string | null) {
    document.title = titleChunk
      ? `${titleChunk} · CarMedic`
      : 'CarMedic'
  }

  function setFavicon(href: string) {
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = href
  }

  return {
    currentStep,
    doneLoggedStep,
    appointmentForm,
    signupForm,
    vehicleForm,
    titleChuck,
    nextStep,
    prevStep,
    setTitle,
    setFavicon
  };
}