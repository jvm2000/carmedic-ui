import { computed } from "vue"
import { useCookie } from "./useCookie";

export function useAuth() {
  const tokenRef = useCookie('auth_token')

  const isLoggedIn = computed(() => !!tokenRef.value);

  return {
    token: tokenRef,
    isLoggedIn,
  };
}