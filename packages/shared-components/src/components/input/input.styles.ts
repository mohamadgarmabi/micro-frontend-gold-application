import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const inputStyles = {
  base: cva(
    'w-full rounded-lg border border-border bg-surface text-foreground outline-none transition-colors placeholder:text-foreground-subtle hover:border-border-strong focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 gold-disabled',
    {
      variants: {
        size: {
          sm: 'h-8 px-2.5 text-xs',
          md: 'h-10 px-3 text-sm',
          lg: 'h-12 px-3.5 text-base',
        },
      },
      defaultVariants: {
        size: 'md',
      },
    },
  ),
  wrapper: cva(styles.inputWrapper),
  withLeftIcon: cva('', {
    variants: {
      size: {
        sm: 'ps-8',
        md: 'ps-9',
        lg: 'ps-11',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }),
  withRightIcon: cva('', {
    variants: {
      size: {
        sm: 'pe-8',
        md: 'pe-9',
        lg: 'pe-11',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }),
  error: cva(styles.inputError),
  iconSlot: cva(styles.inputIconSlot),
  iconLeft: cva(styles.inputIconLeft),
  iconRight: cva(styles.inputIconRight),
  icon: cva('', {
    variants: {
      size: {
        sm: '[&_svg]:size-3.5',
        md: '[&_svg]:size-4',
        lg: '[&_svg]:size-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }),
  errorText: cva(styles.error),
  revealButton: cva(
    'absolute end-1 inset-y-0 z-10 flex items-center rounded-md px-2 text-foreground-subtle transition-colors hover:text-foreground gold-focus',
  ),
}

export { inputStyles }
