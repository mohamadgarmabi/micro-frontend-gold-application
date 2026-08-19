import { cva } from 'class-variance-authority'
import { singleComponentStyles, styles } from '../../lib/styles'

const inputStyles = {
  base: cva(singleComponentStyles.Input ?? ''),
  wrapper: cva(styles.inputWrapper),
  withLeftIcon: cva(styles.inputWithLeftIcon),
  withRightIcon: cva(styles.inputWithRightIcon),
  error: cva(styles.inputError),
  iconSlot: cva(styles.inputIconSlot),
  iconLeft: cva(styles.inputIconLeft),
  iconRight: cva(styles.inputIconRight),
  errorText: cva(styles.error),
  revealButton: cva(
    'absolute end-1 inset-y-0 z-10 flex items-center rounded-md px-2 text-foreground-subtle transition-colors hover:text-foreground gold-focus',
  ),
}

export { inputStyles }
