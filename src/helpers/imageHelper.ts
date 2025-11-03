export function imageHelper() {
  const baseUrl = 'http://localhost:8000/storage'

  const withBaseUrl = (path = '') => {
    if (!path.startsWith('/')) {
      path = '/' + path
    }
    return baseUrl + path
  }

  return { withBaseUrl }
}