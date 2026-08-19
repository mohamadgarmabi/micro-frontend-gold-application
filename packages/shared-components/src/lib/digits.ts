import { autoConvertDigitsToEN } from '@persian-tools/persian-tools'

const toEnglishDigits = (value: string) => {
  return autoConvertDigitsToEN(value)
}

const toEnglishNumericDigits = (value: string) => {
  return toEnglishDigits(value).replace(/\D/g, '')
}

export { toEnglishDigits, toEnglishNumericDigits }
