import { toEnglishDigits, toEnglishNumericDigits } from '../../lib/digits'
import type { OTPFieldProps } from './otp-field.type'

const useOTPField = (props: OTPFieldProps) => {
  const { value, defaultValue, onValueChange, validationType, inputMode, ...rest } = props
  const requestedValidation = validationType ?? 'numeric'

  const normalizeOtpValue = (next: string) => {
    const englishDigits = toEnglishDigits(next)
    return requestedValidation === 'numeric'
      ? toEnglishNumericDigits(englishDigits)
      : englishDigits
  }

  const handleValueChange = (next: string) => {
    onValueChange?.(normalizeOtpValue(next))
  }

  const normalizeString = (next: string | number | readonly string[]) => normalizeOtpValue(String(next))

  return {
    ...rest,
    value: value === undefined ? undefined : normalizeString(value),
    defaultValue: defaultValue === undefined ? undefined : normalizeString(defaultValue),
    onValueChange: onValueChange ? handleValueChange : undefined,
    inputMode: inputMode ?? 'numeric',
  }
}

export { useOTPField }
