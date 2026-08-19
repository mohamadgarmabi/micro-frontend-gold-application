import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const alertdialogStyles = {
  Trigger: cva(styles.button.destructive),
  Popup: cva(styles.popup),
  Backdrop: cva(styles.backdrop),
}

export { alertdialogStyles }
