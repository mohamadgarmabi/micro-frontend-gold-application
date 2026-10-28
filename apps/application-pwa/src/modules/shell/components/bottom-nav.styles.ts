import { cva } from "class-variance-authority"

const bottomNavStyles = cva(
  "pointer-events-none fixed bottom-0 left-[max(0px,calc((100%-28rem)/2))] z-50 flex w-[min(100%,28rem)] justify-center px-[1.15rem] pt-5 pb-[max(0.9rem,env(safe-area-inset-bottom,0px))] lg:hidden",
)

const bottomNavBarStyles = cva("pointer-events-auto relative flex justify-center")

// Glisse CSS is unlayered, so utilities that override its own declarations need `!`.
// Glisse sizes tabs from --lg-tab-width, so five tabs share the frame's inner width.
// The view-transition name only applies mid-transition: a named element is a backdrop root,
// and the glass would otherwise refract an empty backdrop.
const bottomNavTabBarStyles = cva(
  "[--lg-tab-width:calc((min(100vw,28rem)-2.3rem-8px)/5)]! [--lg-tab-height:3.35rem]! [--lg-foreground:var(--accent)] [--lg-muted:var(--muted)] [html:active-view-transition_&]:[view-transition-name:aurum-nav] [&_.lg-tab-copy]:font-bold!",
)

const bottomNavLabelStyles = cva(
  "flex min-w-0 flex-col items-center justify-center gap-[0.12rem] [&>span]:text-[0.625rem] [&>span]:font-medium [&>span]:tracking-[0.01em] [&>span]:whitespace-nowrap",
)

export { bottomNavBarStyles, bottomNavLabelStyles, bottomNavStyles, bottomNavTabBarStyles }
