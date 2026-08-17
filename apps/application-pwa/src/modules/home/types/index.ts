import type { LucideIcon } from 'lucide-react'

type HoldingRow = {
  ouncesLabel: string
  avgLabel: string
  valueLabel: string
  changeLabel: string
}

type MarketRow = {
  symbol: string
  ticker: string
  name: string
  priceLabel: string
  changeLabel: string
  changeClassName: string
  ChangeIcon: LucideIcon
}

type ActivityRow = {
  type: 'BUY' | 'SELL'
  title: string
  date: string
  ouncesLabel: string
  priceLabel: string
  iconWrapClassName: string
  Icon: LucideIcon
  iconClassName: string
}

export type { ActivityRow, HoldingRow, MarketRow }
