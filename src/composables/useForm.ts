import { ref } from "vue";

const currentStep = ref(0)

export function useForm() {
  function nextStep() {
    currentStep.value += 1
  }

  function prevStep() {
    currentStep.value -= 1
  }

  return {
    currentStep,
    nextStep,
    prevStep
  };
}