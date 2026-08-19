import type { ComponentProps, HTMLInputTypeAttribute, ReactNode } from 'react'
import { Input as BaseInput } from '@base-ui/react/input'

type InputProps = ComponentProps<typeof BaseInput> & {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  error?: boolean
  errorMessage?: string
  revealable?: boolean
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

export type { InputProps, InputRevealToggle, InputSanitizeType }
