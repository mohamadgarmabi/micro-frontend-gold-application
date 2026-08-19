import { cva } from 'class-variance-authority'

const priceDisplayStyles = cva('font-mono font-medium text-foreground', {
  variants: {
    size: {
      sm: 'text-base',
      md: 'text-2xl',
      lg: 'text-4xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const priceChangeStyles = cva('mb-0.5 flex items-center gap-0.5 font-mono text-sm', {
  variants: {
    up: {
      true: 'text-success',
      false: 'text-danger',
    },
  },
})

export { priceChangeStyles, priceDisplayStyles }
