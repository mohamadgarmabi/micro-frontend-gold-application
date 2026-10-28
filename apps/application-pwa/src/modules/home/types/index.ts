import type { SwipeAction, SwipeDirection } from "@gold/shared-components/swipe-row"
import type { LucideIcon } from "lucide-react"

type AssetId = "gold" | "silver"

type HomeSwipeTheme = {
  rowColor: string
  drawerColor: string
  textColor: string
  actionColor: string
}

type HomeHeaderModel = {
  greeting: string
  brandName: string
  chartLabel: string
  onOpenChart: () => void
}

type HomeQuoteModel = {
  eyebrow: string
  pairLabel: string
  liveLabel: string
  liveColor: "success" | "warning" | "danger"
  chartLabel: string
  price: number
  change: number
  onOpenChart: () => void
}

type HomeTradeAction = {
  label: string
  tint: string
  onSelect: () => void
}

type HomeHeroProps = {
  quote: HomeQuoteModel
  tradeActions: HomeTradeAction[]
}

type HomeWallet = {
  id: string
  label: string
  value: string
  hint: string
}

type QuickAction = {
  label: string
  to: "/trade" | "/chart" | "/profile"
  Icon: LucideIcon
  tileClassName: string
}

type HomeMarketRow = {
  id: string
  name: string
  symbol: string
  price: number
  change: number
  onSelect: () => void
  className: string
  label: string
  swipeDirection: SwipeDirection
  swipeActions: SwipeAction[]
  swipeTheme: HomeSwipeTheme
}

type HomeActivityRow = {
  id: string
  sideLabel: string
  sideColor: "success" | "danger"
  date: string
  ouncesLabel: string
  priceLabel: string
  className: string
  label: string
  swipeDirection: SwipeDirection
  swipeActions: SwipeAction[]
  swipeTheme: HomeSwipeTheme
  onCommit: (action: SwipeAction) => void
}

export type {
  AssetId,
  HomeActivityRow,
  HomeHeaderModel,
  HomeHeroProps,
  HomeMarketRow,
  HomeQuoteModel,
  HomeSwipeTheme,
  HomeTradeAction,
  HomeWallet,
  QuickAction,
}
