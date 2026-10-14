import { cva } from "class-variance-authority"

const bottomNavStyles = cva(
  "pointer-events-none fixed bottom-0 left-[max(0px,calc((100%-28rem)/2))] z-50 flex w-[min(100%,28rem)] justify-center px-[1.15rem] pt-5 pb-[max(0.9rem,env(safe-area-inset-bottom,0px))]",
)

const bottomNavBarStyles = cva("pointer-events-auto relative w-full flex-auto")

// The view-transition name sits on the glass itself: a named ancestor would become a
// backdrop root and the glass would refract an empty backdrop.
const bottomNavGlassStyles = cva("w-full p-[0.35rem] [view-transition-name:aurum-nav]")

const bottomNavTrackStyles = cva("relative grid min-w-0 flex-1 grid-cols-5")

const bottomNavThumbLayerStyles = cva("pointer-events-none absolute inset-[0.35rem]")

const bottomNavThumbStyles = cva(
  "absolute inset-y-0 left-0 w-0 opacity-0 transition-opacity will-change-[left,width]",
  {
    variants: {
      ready: {
        true: "opacity-100",
      },
    },
  },
)

const bottomNavDropletStyles = cva("h-full w-full")

const bottomNavItemStyles = cva(
  "text-muted relative z-1 flex min-h-[3.35rem] min-w-0 flex-col items-center justify-center gap-[0.12rem] rounded-full border-0 bg-transparent px-[0.2rem] no-underline transition-[color,transform] delay-140 duration-350 [&_span]:text-[0.625rem] [&_span]:font-medium [&_span]:tracking-[0.01em] [&_span]:whitespace-nowrap [&_svg]:transition-transform [&_svg]:delay-140 [&_svg]:duration-350",
  {
    variants: {
      active: {
        true: "text-accent [&_span]:font-bold [&_svg]:scale-108",
      },
    },
  },
)

export {
  bottomNavBarStyles,
  bottomNavDropletStyles,
  bottomNavGlassStyles,
  bottomNavItemStyles,
  bottomNavStyles,
  bottomNavThumbLayerStyles,
  bottomNavThumbStyles,
  bottomNavTrackStyles,
}
