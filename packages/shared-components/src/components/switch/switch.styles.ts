import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const switchStyles = {
  Root: cva(styles.switchRoot),
  Thumb: cva(styles.switchThumb),
}

export { switchStyles }
