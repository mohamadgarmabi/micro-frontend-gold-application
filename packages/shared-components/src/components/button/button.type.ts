import type { ButtonRootProps } from '@heroui/react/button'
import type { MouseEventHandler, ReactNode } from 'react'

type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = Omit<ButtonRootProps, 'children' | 'className' | 'size'> & {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  loading?: boolean
  size?: ButtonSize
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  children?: ReactNode
}

export type { ButtonProps, ButtonSize }
