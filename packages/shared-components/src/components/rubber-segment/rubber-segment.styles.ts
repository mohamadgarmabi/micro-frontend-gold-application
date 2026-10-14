import { cva } from "class-variance-authority"

const rubberSegmentStyles = cva(
  "rubber-segment relative inline-grid grid-flow-col touch-pan-y select-none rounded-[var(--rs-radius)] bg-[var(--rs-track)] p-[var(--rs-inset)] align-middle",
  {
    variants: {
      equal: {
        true: "auto-cols-[minmax(0,1fr)]",
        false: "auto-cols-auto",
      },
    },
    defaultVariants: {
      equal: true,
    },
  },
)

const rubberSegmentItemStyles = cva(
  "rubber-segment__item relative z-1 inline-flex items-center justify-center gap-1.5 rounded-[var(--rs-thumb-radius)] border-0 bg-transparent py-0 leading-none font-medium whitespace-nowrap text-[var(--rs-ink)] opacity-70 outline-none transition-opacity duration-150",
  {
    variants: {
      size: {
        sm: "h-6 min-w-9 px-2.5 text-xs",
        md: "h-8 min-w-11 px-3.5 text-[13px]",
        lg: "h-10 min-w-12 px-4 text-sm",
      },
      active: {
        true: "cursor-default opacity-100",
        false: "cursor-pointer hover:opacity-90",
      },
    },
    defaultVariants: {
      size: "md",
      active: false,
    },
  },
)

const rubberSegmentThumbStyles = cva(
  "rubber-segment__thumb pointer-events-none absolute top-[var(--rs-inset)] bottom-[var(--rs-inset)] z-0 rounded-[var(--rs-thumb-radius)] bg-[var(--rs-thumb)]",
)

export { rubberSegmentItemStyles, rubberSegmentStyles, rubberSegmentThumbStyles }
