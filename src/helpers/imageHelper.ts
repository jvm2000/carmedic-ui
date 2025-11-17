export function imageHelper() {
  const baseUrl = 'https://abledonline.com/carmedicdirectory/api/public_html/storage'

  const withBaseUrl = (path = '') => {
    if (!path.startsWith('/')) {
      path = '/' + path
    }
    return baseUrl + path
  }

  return { withBaseUrl }
}