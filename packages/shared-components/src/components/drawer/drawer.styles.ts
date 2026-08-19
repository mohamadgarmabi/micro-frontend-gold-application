import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const drawerTrigger = cva([styles.button.base, styles.button.secondary])

const drawerClose = cva([styles.button.base, styles.button.ghost])

const drawerTitle = cva(styles.title)

const drawerDescription = cva(styles.description)

const drawerOverlay = cva('fixed inset-0 z-50 bg-gold-900/40 backdrop-blur-[2px]')

const drawerContent = cva(
  'fixed inset-x-0 bottom-0 z-50 mx-auto mt-24 flex h-auto max-h-[96%] w-full max-w-md flex-col rounded-t-3xl border border-border bg-surface-elevated pb-[max(0.75rem,env(safe-area-inset-bottom))] text-foreground shadow-popup outline-none',
)

const drawerHandle = cva('mx-auto mt-4 mb-2 h-1.5 w-12 shrink-0 rounded-full bg-border-strong/50')

export {
  drawerClose,
  drawerContent,
  drawerDescription,
  drawerHandle,
  drawerOverlay,
  drawerTitle,
  drawerTrigger,
}
