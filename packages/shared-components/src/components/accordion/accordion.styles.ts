import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const accordionStyles = {
  Trigger: cva(styles.accordionTrigger),
  Panel: cva(styles.accordionPanel),
}

export { accordionStyles }
