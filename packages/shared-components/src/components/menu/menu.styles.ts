import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const menuStyles = {
  Trigger: cva(styles.button.secondary),
  Popup: cva(styles.menuPopup),
  Item: cva(styles.menuItem),
}

export { menuStyles }
