import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const sliderStyles = {
  Root: cva(styles.sliderRoot),
  Track: cva(styles.sliderTrack),
  Indicator: cva(styles.sliderIndicator),
  Thumb: cva(styles.sliderThumb),
}

export { sliderStyles }
