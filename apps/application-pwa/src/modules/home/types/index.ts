import type { LucideIcon } from 'lucide-react'

type AssetId = 'gold' | 'silver'

type HomeHeaderModel = {
  greeting: string
  brandName: string
  onOpenChart: () => void
}

type HomeQuoteModel = {
  eyebrow: string
  pairLabel: string
  liveLabel: string
  chartLabel: string
  price: number
  change: number
  onOpenChart: () => void
}

type HomeTradeAction = {
  label: string
  variant: 'primary' | 'danger'
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
  to: '/trade' | '/chart' | '/profile'
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
}

type HomeActivityRow = {
  id: string
  sideLabel: string
  sideColorClassName: string
  date: string
  ouncesLabel: string
  priceLabel: string
  className: string
}

export type {
  AssetId,
  HomeActivityRow,
  HomeHeaderModel,
  HomeHeroProps,
  HomeMarketRow,
  HomeQuoteModel,
  HomeTradeAction,
  HomeWallet,
  QuickAction,
}
