import type { ElementType } from 'react'
import { cn } from '../../lib/cn'
import type { TypographyProps } from './typography.type'
import { typographyDefaultWeight, typographyStyles } from './typography.styles'

const useTypography = <E extends ElementType = 'p'>(props: TypographyProps<E>) => {
  const {
    as,
    size = 'md',
    weight = typographyDefaultWeight[size],
    color = 'foreground',
    align,
    className,
    ...rest
  } = props

  return {
    Component: as ?? 'p',
    className: cn(typographyStyles({ size, weight, color, align }), className),
    rest,
  }
}

export { useTypography }
