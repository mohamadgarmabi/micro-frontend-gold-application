import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const buttonClassName = cva(
  [
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors gold-focus gold-disabled select-none',
    styles.button.primary,
  ],
  {
    variants: {
      size: {
        sm: 'h-8 gap-1.5 px-3 text-xs',
        md: 'h-10 gap-2 px-4 text-sm',
        lg: 'h-12 gap-2 px-5 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const buttonIconClassName = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-3.5 [&_svg]:size-3.5',
      md: 'size-4 [&_svg]:size-4',
      lg: 'size-5 [&_svg]:size-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export { buttonClassName, buttonIconClassName }
