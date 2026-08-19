import { toEnglishDigits, toEnglishNumericDigits } from '../../lib/digits'
import type { OTPFieldInputProps, OTPFieldProps } from './otp-field.type'

const useOTPField = (props: OTPFieldProps) => {
  const { value, defaultValue, normalizeValue, validationType, inputMode, ...rest } = props
  const requestedValidation = validationType ?? 'numeric'

  const normalizeOtpValue = (next: string) => {
    const englishDigits = toEnglishDigits(next)
    const filtered =
      requestedValidation === 'numeric' ? toEnglishNumericDigits(englishDigits) : englishDigits

    return normalizeValue ? toEnglishDigits(normalizeValue(filtered)) : filtered
  }

  return {
    ...rest,
    value: value === undefined ? undefined : normalizeOtpValue(value),
    defaultValue: defaultValue === undefined ? undefined : normalizeOtpValue(defaultValue),
    inputMode: inputMode ?? 'numeric',
    validationType: 'none' as const,
    normalizeValue: normalizeOtpValue,
  }
}

const useOTPFieldInput = (props: OTPFieldInputProps) => {
  return {
    ...props,
    dir: 'ltr' as const,
  }
}

export { useOTPField, useOTPFieldInput }
