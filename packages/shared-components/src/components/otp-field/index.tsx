import { createContext, useContext, type ReactNode } from 'react'
import { InputOTP } from '@heroui/react/input-otp'
import { useOTPField } from './otp-field.hook'
import type { OTPFieldInputProps, OTPFieldProps } from './otp-field.type'

const OTPFieldSlotIndexContext = createContext<(() => number) | null>(null)

const OTPFieldRoot = (props: OTPFieldProps) => {
  const { length, maxLength, className, children, ...rest } = props
  const normalized = useOTPField(props)
  const slotLength = length ?? maxLength ?? 6
  let slotIndex = 0
  const getNextSlotIndex = () => slotIndex++

  return (
    <InputOTP
      maxLength={slotLength}
      value={normalized.value}
      onChange={normalized.onValueChange}
      className={className}
      {...rest}
    >
      <OTPFieldSlotIndexContext.Provider value={getNextSlotIndex}>
        <InputOTP.Group className="flex justify-center gap-3">{children}</InputOTP.Group>
      </OTPFieldSlotIndexContext.Provider>
    </InputOTP>
  )
}

const OTPFieldInput = (props: OTPFieldInputProps) => {
  const getNextSlotIndex = useContext(OTPFieldSlotIndexContext)
  const { index: explicitIndex, ...slotProps } = props
  const index = explicitIndex ?? getNextSlotIndex?.() ?? 0

  return <InputOTP.Slot {...slotProps} index={index} />
}

const OTPFieldGroup = (props: { className?: string; children?: ReactNode }) => {
  return <InputOTP.Group {...props} />
}

const OTPField = Object.assign(OTPFieldRoot, {
  Input: OTPFieldInput,
  Group: OTPFieldGroup,
  Slot: InputOTP.Slot,
  Separator: InputOTP.Separator,
})

export default OTPField
export type { OTPFieldInputProps, OTPFieldProps }
