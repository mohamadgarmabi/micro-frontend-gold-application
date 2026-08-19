import { createElement } from 'react'
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field'
import { createStyledModule } from '../../lib/create-styled-module'
import { useOTPField, useOTPFieldInput } from './otp-field.hook'
import { otpfieldStyles } from './otp-field.styles'
import type { OTPFieldInputProps, OTPFieldProps } from './otp-field.type'

const StyledOTPField = createStyledModule(BaseOTPField, otpfieldStyles)

const OTPFieldRoot = (props: OTPFieldProps) => {
  const otpProps = useOTPField(props)
  return createElement(StyledOTPField, otpProps)
}

const OTPFieldInput = (props: OTPFieldInputProps) => {
  const inputProps = useOTPFieldInput(props)
  return createElement(StyledOTPField.Input, inputProps)
}

const OTPField = Object.assign(OTPFieldRoot, {
  Input: OTPFieldInput,
})

export default OTPField
export type { OTPFieldInputProps, OTPFieldProps }
