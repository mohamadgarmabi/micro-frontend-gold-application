import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const collapsibleStyles = {
  Trigger: cva(styles.accordionTrigger),
  Panel: cva(styles.accordionPanel),
}

export { collapsibleStyles }
