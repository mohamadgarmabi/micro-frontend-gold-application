import { cva } from "class-variance-authority"

const glassToastStyles = cva("w-full")

const glassToastContentStyles = cva("text-foreground flex items-start gap-3 px-4 py-3.5 font-sans")

const glassToastDotStyles = cva("mt-1.5 size-2 shrink-0 rounded-full", {
  variants: {
    type: {
      default: "bg-foreground-muted",
      success: "bg-success",
      error: "bg-danger",
      warning: "bg-warning",
      info: "bg-info",
    },
  },
})

const glassToastTextStyles = cva("min-w-0 flex-1 text-start")

const glassToastTitleStyles = cva("text-sm leading-[1.4] font-semibold")

const glassToastDescriptionStyles = cva("text-foreground-muted mt-0.5 text-sm leading-[1.45]")

const glassToastCloseStyles = cva(
  "text-foreground-subtle hover:text-foreground -me-1 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent transition-colors",
)

export {
  glassToastCloseStyles,
  glassToastContentStyles,
  glassToastDescriptionStyles,
  glassToastDotStyles,
  glassToastStyles,
  glassToastTextStyles,
  glassToastTitleStyles,
}
