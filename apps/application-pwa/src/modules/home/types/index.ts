import type { LucideIcon } from 'lucide-react'

type AssetId = 'gold' | 'silver'

type AssetTab = {
  id: AssetId
  label: string
  onSelect: () => void
  className: string
}

type WalletTile = {
  label: string
  value: string
  hint: string
}

type QuickAction = {
  label: string
  to: '/trade' | '/chart' | '/profile'
  Icon: LucideIcon
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

export type { ActivityRow, AssetId, AssetTab, QuickAction, WalletTile }
