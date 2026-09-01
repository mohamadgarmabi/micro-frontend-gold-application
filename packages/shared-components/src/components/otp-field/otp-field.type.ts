import type { ComponentProps, ReactNode } from 'react'
import type { InputOTPRootProps } from '@heroui/react/input-otp'

type OTPFieldProps = Omit<InputOTPRootProps, 'onChange' | 'maxLength'> & {
  length?: number
  maxLength?: number
  onValueChange?: (value: string) => void
  children?: ReactNode
  validationType?: 'numeric' | 'text'
}

type OTPFieldInputProps = Partial<ComponentProps<typeof import('@heroui/react/input-otp').InputOTP.Slot>>

export type { OTPFieldInputProps, OTPFieldProps }
