import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const popoverStyles = {
  Trigger: cva(styles.button.secondary),
  Popup: cva(styles.popup),
}

export { popoverStyles }
