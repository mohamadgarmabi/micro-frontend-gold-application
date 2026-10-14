import { cva } from "class-variance-authority"

// Toasts span the full app column (same frame as the bottom nav); the position only
// picks the top or bottom edge.
const toasterStyles = cva(
  "pointer-events-none fixed left-[max(0px,calc((100%-28rem)/2))] z-[60] flex w-[min(100%,28rem)] gap-2 px-4",
  {
    variants: {
      position: {
        "top-left": "top-[max(1rem,env(safe-area-inset-top))] flex-col",
        "top-center": "top-[max(1rem,env(safe-area-inset-top))] flex-col",
        "top-right": "top-[max(1rem,env(safe-area-inset-top))] flex-col",
        "bottom-left": "bottom-[max(1rem,env(safe-area-inset-bottom))] flex-col-reverse",
        "bottom-center": "bottom-[max(1rem,env(safe-area-inset-bottom))] flex-col-reverse",
        "bottom-right": "bottom-[max(1rem,env(safe-area-inset-bottom))] flex-col-reverse",
      },
    },
  },
)

const toasterItemStyles = cva("pointer-events-auto w-full touch-pan-y")

export { toasterItemStyles, toasterStyles }
