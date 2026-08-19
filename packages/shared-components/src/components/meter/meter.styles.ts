import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const meterStyles = {
  Root: cva(styles.meterTrack),
  Indicator: cva(styles.meterIndicator),
  Track: cva(styles.meterTrack),
}

export { meterStyles }
