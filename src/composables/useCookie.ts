import { ref, watch } from 'vue'

export function useCookie(name: string, defaultValue: string | null = null) {
  const getCookie = (key: string): string | null => {
    const value = document.cookie
      .split('; ')
      .find(row => row.startsWith(key + '='))
      ?.split('=')[1]
    return value ? decodeURIComponent(value) : null
  }

  const setCookie = (key: string, value: string, days = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires}; path=/`
  }

  const deleteCookie = (key: string) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }

  // make it reactive
  const cookie = ref<string | null>(getCookie(name) || defaultValue)

  // update cookie when value changes
  watch(cookie, (newVal) => {
    if (newVal === null) {
      deleteCookie(name)
    } else {
      setCookie(name, newVal)
    }
  })

  return cookie
}
