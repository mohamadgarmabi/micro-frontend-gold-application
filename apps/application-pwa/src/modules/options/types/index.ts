import type { LiquidGlassSettingKey } from "#/modules/shell/types"
import type { SwipeAction, SwipeDirection } from "@gold/shared-components/swipe-row"
import type { LucideIcon } from "lucide-react"

type OptionsSwipeTheme = {
  rowColor: string
  drawerColor: string
  textColor: string
  actionColor: string
}

type SavedAlert = {
  id: string
  price: string
  directionLabel: string
  contentClassName: string
  icon: LucideIcon
  iconClassName: string
  label: string
  swipeDirection: SwipeDirection
  swipeActions: SwipeAction[]
  swipeTheme: OptionsSwipeTheme
  onCommit: (action: SwipeAction) => void
}

type GlassSettingControl = {
  id: LiquidGlassSettingKey
  label: string
  hint: string
  valueLabel: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number | number[]) => void
}

export type { GlassSettingControl, OptionsSwipeTheme, SavedAlert }
