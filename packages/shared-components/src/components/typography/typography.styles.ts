import { cva } from 'class-variance-authority'
import type { TypographySize, TypographyWeight } from './typography.type'

const typographyStyles = cva('', {
  variants: {
    size: {
      display: 'text-display',
      xl: 'text-title',
      lg: 'text-heading',
      md: 'text-body',
      sm: 'text-caption',
      xs: 'text-overline',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      foreground: 'text-foreground',
      muted: 'text-foreground-muted',
      subtle: 'text-foreground-subtle',
      brand: 'text-gold-600',
      'on-brand': 'text-foreground-on-brand',
      success: 'text-success',
      danger: 'text-danger',
      warning: 'text-warning',
    },
    align: {
      start: 'text-start',
      center: 'text-center',
      end: 'text-end',
    },
  },
})

const typographyDefaultWeight: Record<TypographySize, TypographyWeight> = {
  display: 'bold',
  xl: 'semibold',
  lg: 'semibold',
  md: 'regular',
  sm: 'regular',
  xs: 'medium',
}

export { typographyDefaultWeight, typographyStyles }
