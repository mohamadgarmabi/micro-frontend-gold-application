import { cva } from "class-variance-authority"

const sideNavStyles = cva(
  "border-border hidden h-full w-60 shrink-0 flex-col gap-1 border-e bg-surface/60 px-3 py-6 lg:flex",
)

const sideNavBrandStyles = cva("mb-6 flex items-center gap-3 px-3")

const sideNavItemStyles = cva(
  "flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm font-medium no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)",
  {
    variants: {
      active: {
        true: "bg-accent/15 text-foreground",
        false: "text-muted hover:bg-foreground/5 hover:text-foreground",
      },
    },
  },
)

export { sideNavBrandStyles, sideNavItemStyles, sideNavStyles }
