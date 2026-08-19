import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const navigationmenuStyles = {
  List: cva(styles.navigationList),
  Trigger: cva(styles.navigationTrigger),
  Popup: cva(styles.popup),
}

export { navigationmenuStyles }
