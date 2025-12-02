import { ref, watch } from 'vue'

export function useCookie<T = string>(name: string, defaultValue: T | null = null) {
  const getCookie = (key: string): T => {
    const value = document.cookie
      .split('; ')
      .find(row => row.startsWith(key + '='))
      ?.split('=')[1]

    if (value === undefined) return defaultValue ?? null as unknown as T
    try {
      return JSON.parse(decodeURIComponent(value)) as T
    } catch {
      return value as unknown as T
    }
  }

  const cookie = ref<T>(getCookie(name))

  watch(cookie, (newValue) => {
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(newValue))}; path=/`
  }, { deep: true })

  return cookie
}
