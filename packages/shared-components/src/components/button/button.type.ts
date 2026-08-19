import { Button as BaseButton } from '@base-ui/react/button'
import type { ComponentProps, ReactNode } from 'react'

type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ComponentProps<typeof BaseButton> & {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  loading?: boolean
  size?: ButtonSize
}

export type { ButtonProps, ButtonSize }
