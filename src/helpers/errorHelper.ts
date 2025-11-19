export function getError(errors: any, field: string): any | null {
  if (errors && errors[field] && errors[field].length > 0) {
    return errors[field][0]
  }

  return null
}