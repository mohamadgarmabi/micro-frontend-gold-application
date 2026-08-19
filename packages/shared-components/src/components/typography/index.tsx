import { createElement, type ElementType } from 'react'
import type { TypographyProps } from './typography.type'
import { useTypography } from './typography.hook'

const Typography = <E extends ElementType = 'p'>(props: TypographyProps<E>) => {
  const { Component, className, rest } = useTypography(props)

  return createElement(Component, { className, ...rest })
}

export default Typography
export type {
  TypographyAlign,
  TypographyColor,
  TypographyProps,
  TypographySize,
  TypographyWeight,
} from './typography.type'
