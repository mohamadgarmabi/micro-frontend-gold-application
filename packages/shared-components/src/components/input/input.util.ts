import { toEnglishDigits } from '../../lib/digits'
import type { InputSanitizeType } from './input.type'

const ARABIC_SCRIPT_PATTERN = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g

const stripArabicScript = (value: string) => {
  return value.replace(ARABIC_SCRIPT_PATTERN, '')
}

const sanitizeTextInputValue = (value: string) => {
  return toEnglishDigits(value)
}

const sanitizeNumberInputValue = (value: string) => {
  return toEnglishDigits(value).replace(/[^\d.-]/g, '')
}

const sanitizeTelInputValue = (value: string) => {
  const english = toEnglishDigits(value)
  const hasPlus = english.trim().startsWith('+')
  const digits = english.replace(/\D/g, '')

  return hasPlus ? `+${digits}` : digits
}

const sanitizeEmailInputValue = (value: string) => {
  return stripArabicScript(toEnglishDigits(value))
    .replace(/\s/g, '')
    .replace(/[^a-zA-Z0-9@._%+-]/g, '')
}

const sanitizePasswordInputValue = (value: string) => {
  return stripArabicScript(toEnglishDigits(value))
}

const sanitizeUrlInputValue = (value: string) => {
  return stripArabicScript(toEnglishDigits(value)).replace(/\s/g, '')
}

const inputValueSanitizers: Record<InputSanitizeType, (value: string) => string> = {
  text: sanitizeTextInputValue,
  search: sanitizeTextInputValue,
  number: sanitizeNumberInputValue,
  tel: sanitizeTelInputValue,
  email: sanitizeEmailInputValue,
  password: sanitizePasswordInputValue,
  url: sanitizeUrlInputValue,
}

const isInputSanitizeType = (type: string): type is InputSanitizeType => {
  return type in inputValueSanitizers
}

const sanitizeInputValue = (value: string, type = 'text') => {
  const sanitize = isInputSanitizeType(type) ? inputValueSanitizers[type] : sanitizeTextInputValue

  return sanitize(value)
}

const resolveInputDomType = (type = 'text') => {
  return type === 'number' ? 'text' : type
}

const resolveInputMode = (type = 'text') => {
  if (type === 'number') {
    return 'decimal' as const
  }

  if (type === 'tel') {
    return 'tel' as const
  }

  if (type === 'email') {
    return 'email' as const
  }

  if (type === 'url') {
    return 'url' as const
  }

  return undefined
}

const resolveInputDirection = (type = 'text') => {
  if (
    type === 'email' ||
    type === 'password' ||
    type === 'number' ||
    type === 'tel' ||
    type === 'url'
  ) {
    return 'ltr' as const
  }

  return undefined
}

export { resolveInputDirection, resolveInputDomType, resolveInputMode, sanitizeInputValue }
