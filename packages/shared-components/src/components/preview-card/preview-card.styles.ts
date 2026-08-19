import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const previewcardStyles = {
  Trigger: cva(styles.button.ghost),
  Popup: cva(styles.previewCardPopup),
}

export { previewcardStyles }
