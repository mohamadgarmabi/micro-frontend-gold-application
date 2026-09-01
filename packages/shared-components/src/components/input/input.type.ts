import type { ComponentProps, HTMLInputTypeAttribute, ReactNode } from 'react'

type InputSize = 'sm' | 'md' | 'lg'

type InputChangeEventDetails = {
  event: Event
  reason: 'input' | 'paste' | 'drop' | 'reset'
}

type InputProps = Omit<ComponentProps<'input'>, 'size'> & {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  error?: boolean
  errorMessage?: string
  revealable?: boolean
  size?: InputSize
  onValueChange?: (value: string, eventDetails: InputChangeEventDetails) => void
}

type InputRevealToggle = {
  onClick: () => void
  className: string
  label: string
  icon: ReactNode
  pressed: boolean
}

type InputSanitizeType = Extract<
  HTMLInputTypeAttribute,
  'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
>

export type { InputProps, InputRevealToggle, InputSanitizeType, InputSize, InputChangeEventDetails }
