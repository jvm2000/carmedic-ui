import { computed, ref } from "vue";

export function useAuth() {
  const tokenRef = ref<string | null>(null);

  const isLoggedIn = computed(() => !!tokenRef.value);

  return {
    token: tokenRef,
    isLoggedIn,
  };
}