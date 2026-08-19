import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const checkboxStyles = {
  Root: cva(styles.checkboxRoot),
  Indicator: cva(styles.checkboxIndicator),
}

export { checkboxStyles }
