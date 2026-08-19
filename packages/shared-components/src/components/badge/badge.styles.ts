import { cva } from 'class-variance-authority'

const badgeStyles = cva(
  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-gold-200 text-gold-800',
        brand: 'border border-gold-600/20 bg-gold-600/10 text-gold-600',
        success: 'border border-success/20 bg-success-muted text-success',
        danger: 'border border-danger/20 bg-danger-muted text-danger',
      },
    },
    defaultVariants: {
      variant: 'brand',
    },
  },
)

export { badgeStyles }
