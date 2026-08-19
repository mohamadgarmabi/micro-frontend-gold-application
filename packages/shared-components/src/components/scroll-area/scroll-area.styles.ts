import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const scrollareaStyles = {
  Root: cva('rounded-lg border border-border'),
  Viewport: cva(styles.scrollViewport),
  Scrollbar: cva(styles.scrollScrollbar),
  Thumb: cva(styles.scrollThumb),
}

export { scrollareaStyles }
