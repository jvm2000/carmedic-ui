import { ref } from "vue";
import type { Appointment } from "../types";

const appointment = ref<Appointment | null>(null)

export function useAppointment() {
  return {
    appointment,
  };
}