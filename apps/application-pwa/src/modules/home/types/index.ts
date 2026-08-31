import type { CSSProperties } from 'react'
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
  tileClassName: string
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

type GaugeTick = {
  id: string
  className: string
  style: CSSProperties
}

type HomeHeaderModel = {
  brandName: string
  dateLabel: string
  streakLabel: string
  onOpenCalendar: () => void
}

type HomeHeroModel = {
  eyebrow: string
  caption: string
  value: string
  chipLabel: string
  chipHint: string
  protocolLabel: string
  progressLabel: string
  onToggleAsset: () => void
}

type HomeHeroProps = {
  hero: HomeHeroModel
  gaugeTicks: GaugeTick[]
}

type StatusCard = {
  id: string
  title: string
  when: string
  value: string
  hint: string
  badgeLabel: string
  badgeClassName: string
  BadgeIcon: LucideIcon
}

export type {
  ActivityRow,
  AssetId,
  AssetTab,
  GaugeTick,
  HomeHeaderModel,
  HomeHeroModel,
  HomeHeroProps,
  QuickAction,
  StatusCard,
  WalletTile,
}
