import type { ElementType, ReactNode } from 'react'
import type { PolymorphicProps } from '../../lib/polymorphic.type'

type TypographySize = 'display' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold'

type TypographyColor =
  | 'foreground'
  | 'muted'
  | 'subtle'
  | 'brand'
  | 'on-brand'
  | 'success'
  | 'danger'
  | 'warning'

type TypographyAlign = 'start' | 'center' | 'end'

type TypographyOwnProps = {
  size?: TypographySize
  weight?: TypographyWeight
  color?: TypographyColor
  align?: TypographyAlign
  className?: string
  children?: ReactNode
}

type TypographyProps<E extends ElementType = 'p'> = PolymorphicProps<E, TypographyOwnProps>

export type {
  TypographyAlign,
  TypographyColor,
  TypographyOwnProps,
  TypographyProps,
  TypographySize,
  TypographyWeight,
}
