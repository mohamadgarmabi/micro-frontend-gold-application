import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const progressStyles = {
  Root: cva(styles.progressRoot),
  Indicator: cva(styles.progressIndicator),
}

export { progressStyles }
