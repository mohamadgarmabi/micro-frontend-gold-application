import type { ReactNode, RefObject } from "react"

type RubberSegmentSize = "sm" | "md" | "lg"

type RubberSegmentItem =
  | string
  | {
      value: string
      label: ReactNode
      icon?: ReactNode
    }

type RubberSegmentProps = {
  items: RubberSegmentItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string, index: number) => void
  trackColor?: string
  thumbColor?: string
  textColor?: string
  activeTextColor?: string
  size?: RubberSegmentSize
  radius?: number
  inset?: number
  equalSlots?: boolean
  stretch?: number
  squash?: number
  speed?: number
  disabled?: boolean
  className?: string
  "aria-label"?: string
}

type RubberSlot = {
  left: number
  right: number
}

type UseRubberThumbOptions = {
  activeIndex: number
  stretch?: number
  squash?: number
  speed?: number
  enabled?: boolean
  /** Bump to force slot remeasure (locale, theme, glass, …). */
  remeasureKey?: string | number
}

type UseRubberThumbModel = {
  trackRef: RefObject<HTMLDivElement | null>
  thumbRef: RefObject<HTMLSpanElement | null>
  isReady: boolean
  measure: () => void
  registerSlotElement: (index: number, element: HTMLElement | null) => void
}

export type {
  RubberSegmentItem,
  RubberSegmentProps,
  RubberSegmentSize,
  RubberSlot,
  UseRubberThumbModel,
  UseRubberThumbOptions,
}
