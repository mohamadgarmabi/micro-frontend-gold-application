import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const tabsStyles = {
  List: cva(styles.tabsList),
  Tab: cva(styles.tabsTrigger),
  Panel: cva(styles.tabsPanel),
}

export { tabsStyles }
