import type { SwipeAction, SwipeDirection } from "@gold/shared-components/swipe-row"

type TradeSide = "buy" | "sell"

type OrderRow = {
  label: string
  value: string
}

type QuickAmount = {
  value: number
  label: string
  onSelect: () => void
}

type TradeSwipeTheme = {
  rowColor: string
  drawerColor: string
  textColor: string
  actionColor: string
}

type TradeRecentOrder = {
  id: string
  sideLabel: string
  sideColor: "success" | "danger"
  amountLabel: string
  priceLabel: string
  timeLabel: string
  contentClassName: string
  label: string
  swipeDirection: SwipeDirection
  swipeActions: SwipeAction[]
  swipeTheme: TradeSwipeTheme
  onCommit: (action: SwipeAction) => void
}

export type { OrderRow, QuickAmount, TradeRecentOrder, TradeSide, TradeSwipeTheme }
