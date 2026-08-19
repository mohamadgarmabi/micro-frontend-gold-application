import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const avatarStyles = {
  Root: cva(styles.avatarRoot),
  Image: cva(styles.avatarImage),
  Fallback: cva(styles.avatarFallback),
}

export { avatarStyles }
