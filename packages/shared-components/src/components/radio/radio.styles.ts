import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const radioStyles = {
  Root: cva(styles.radioRoot),
  Indicator: cva(styles.radioIndicator),
}

export { radioStyles }
