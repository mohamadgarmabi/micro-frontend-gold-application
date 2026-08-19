import { useState } from 'react'
import { inputEyeIcon, inputEyeOffIcon } from './input.icons'
import { inputStyles } from './input.styles'
import type { InputProps, InputRevealToggle } from './input.type'
import {
  resolveInputDirection,
  resolveInputDomType,
  resolveInputMode,
  sanitizeInputValue,
} from './input.util'

const useInput = (props: InputProps) => {
  const {
    id,
    name,
    type = 'text',
    inputMode,
    dir,
    error = false,
    errorMessage,
    value,
    defaultValue,
    onChange,
    onValueChange,
    revealable = true,
    rightIcon,
  } = props
  const inputId = id ?? name
  const isPassword = String(type) === 'password'
  const [isRevealed, setIsRevealed] = useState(false)
  const showRevealToggle = isPassword && revealable
  const normalize = (next: string) => sanitizeInputValue(next, String(type))

  const handleChange: NonNullable<InputProps['onChange']> = (event) => {
    const next = normalize(event.currentTarget.value)

    if (next !== event.currentTarget.value) {
      event.currentTarget.value = next
    }

    onChange?.(event)
  }

  const handleValueChange: NonNullable<InputProps['onValueChange']> = (next, eventDetails) => {
    onValueChange?.(normalize(next), eventDetails)
  }

  const handleRevealToggle = () => {
    setIsRevealed((current) => !current)
  }

  const revealToggle: InputRevealToggle | undefined = showRevealToggle
    ? {
        onClick: handleRevealToggle,
        className: inputStyles.revealButton(),
        label: isRevealed ? 'Hide password' : 'Show password',
        icon: isRevealed ? inputEyeOffIcon : inputEyeIcon,
        pressed: isRevealed,
      }
    : undefined

  return {
    inputId,
    errorDescribedBy: error && errorMessage && inputId ? `${inputId}-error` : undefined,
    type: isPassword && isRevealed ? 'text' : resolveInputDomType(String(type)),
    inputMode: inputMode ?? resolveInputMode(String(type)),
    dir: dir ?? resolveInputDirection(String(type)),
    hasEndAdornment: Boolean(rightIcon) || showRevealToggle,
    revealToggle,
    value: typeof value === 'string' ? normalize(value) : value,
    defaultValue: typeof defaultValue === 'string' ? normalize(defaultValue) : defaultValue,
    onChange: handleChange,
    onValueChange: onValueChange ? handleValueChange : undefined,
  }
}

export { useInput }
