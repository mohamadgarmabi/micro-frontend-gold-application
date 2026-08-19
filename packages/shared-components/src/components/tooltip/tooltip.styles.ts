import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const tooltipStyles = {
  Trigger: cva(styles.button.ghost),
  Popup: cva(styles.tooltipPopup),
}

export { tooltipStyles }
