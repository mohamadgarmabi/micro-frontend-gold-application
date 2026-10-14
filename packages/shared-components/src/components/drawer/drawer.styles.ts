import { cva } from "class-variance-authority"
import { styles } from "../../lib/styles"

const drawerTrigger = cva([styles.button.base, styles.button.secondary])

const drawerClose = cva([styles.button.base, styles.button.ghost])

const drawerTitle = cva(styles.title)

const drawerDescription = cva(styles.description)

const drawerOverlay = cva("fixed inset-0 z-50 bg-background/40 backdrop-blur-[2px]")

const drawerContent = cva(
  "fixed inset-x-0 bottom-0 z-50 mx-auto mt-24 flex h-auto max-h-[96%] w-full max-w-md flex-col isolate rounded-t-3xl border border-border/40 bg-transparent pb-[max(0.75rem,env(safe-area-inset-bottom))] text-foreground shadow-popup outline-none",
)

// The glass layer runs past the bottom edge so only the top corners read as rounded.
const drawerGlassLayer = cva("pointer-events-none absolute inset-x-0 top-0 -bottom-12 -z-10")

const drawerGlass = cva("h-full w-full")

const drawerHandle = cva("mx-auto mt-4 mb-2 h-1.5 w-12 shrink-0 rounded-full bg-border-strong/50")

export {
  drawerClose,
  drawerContent,
  drawerDescription,
  drawerGlass,
  drawerGlassLayer,
  drawerHandle,
  drawerOverlay,
  drawerTitle,
  drawerTrigger,
}
