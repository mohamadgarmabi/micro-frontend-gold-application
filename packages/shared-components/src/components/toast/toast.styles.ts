import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const toastStyles = {
  Viewport: cva(styles.toastViewport),
  Root: cva(styles.toastRoot),
}

export { toastStyles }
