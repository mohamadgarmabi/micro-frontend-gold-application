import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const dialogStyles = {
  Trigger: cva(styles.button.primary),
  Popup: cva(styles.popup),
  Backdrop: cva(styles.backdrop),
}

export { dialogStyles }
