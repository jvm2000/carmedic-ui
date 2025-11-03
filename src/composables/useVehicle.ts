import { ref } from "vue";
import type { Vehicle } from "../types";

const vehicle = ref<Vehicle | null>(null)

export function useVehicle() {
  return {
    vehicle,
  };
}