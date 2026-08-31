import { useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  Check,
  FileText,
  Truck,
} from 'lucide-react'
import { recentActivity } from '#/modules/market/utils/data'
import { fmt } from '#/modules/market/utils/format'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import type {
  AssetId,
  AssetTab,
  HomeHeaderModel,
  HomeHeroModel,
  QuickAction,
  StatusCard,
} from '../types'
import { gaugeTicks } from '../utils/gauge'

const VAULT_SOT = '1,250'
const LAST_TRADE_OZ = recentActivity[0]?.oz ?? 1

const assetClassName = {
  active: 'rounded-full bg-button px-4 py-1.5 text-xs font-semibold text-button-foreground',
  idle: 'rounded-full bg-surface-elevated px-4 py-1.5 text-xs font-medium text-foreground-subtle',
} as const

const quotes = {
  gold: { price: 3302.45 },
  silver: { price: 32.18 },
} as const

const dateLocales = {
  en: 'en-US',
  fa: 'fa-IR',
} as const

const useHome = () => {
  const { t, locale } = useI18n()
  const navigate = useNavigate()
  const [asset, setAsset] = useState<AssetId>('gold')
  const quote = quotes[asset]

  const onOpenCalendar = () => {
    void navigate({ to: '/chart' })
  }

  const onToggleAsset = () => {
    setAsset((current) => (current === 'gold' ? 'silver' : 'gold'))
  }

  const header: HomeHeaderModel = {
    brandName: t('home.brand'),
    dateLabel: new Intl.DateTimeFormat(dateLocales[locale], {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(new Date()),
    streakLabel: '21',
    onOpenCalendar,
  }

  const assetTabs: AssetTab[] = [
    {
      id: 'gold',
      label: t('home.assetGold'),
      onSelect: () => setAsset('gold'),
      className: asset === 'gold' ? assetClassName.active : assetClassName.idle,
    },
    {
      id: 'silver',
      label: t('home.assetSilver'),
      onSelect: () => setAsset('silver'),
      className: asset === 'silver' ? assetClassName.active : assetClassName.idle,
    },
  ]

  const hero: HomeHeroModel = {
    eyebrow: t('home.liveNow'),
    caption: t('home.liveCaption'),
    value: `$${fmt(quote.price)}`,
    chipLabel: asset === 'gold' ? t('home.assetGold') : t('home.assetSilver'),
    chipHint: t('home.unitGram'),
    protocolLabel: t('home.walletProtocol'),
    progressLabel: t('home.holdingsProgress', { amount: VAULT_SOT }),
    onToggleAsset,
  }

  const statusCards: StatusCard[] = [
    {
      id: 'last-trade',
      title: t('home.lastTrade'),
      when: t('home.lastTradeWhen'),
      value: `${LAST_TRADE_OZ} oz`,
      hint: t('home.buyGoldAction'),
      badgeLabel: t('home.logged'),
      badgeClassName: 'aurum-status-badge aurum-status-badge--info',
      BadgeIcon: Check,
    },
    {
      id: 'vault',
      title: t('home.vaultStatus'),
      when: t('home.vaultWhen'),
      value: t('home.goldVaultValue', { amount: VAULT_SOT }),
      hint: t('home.coverHint', { amount: '4' }),
      badgeLabel: t('home.topUpSoon'),
      badgeClassName: 'aurum-status-badge aurum-status-badge--warning',
      BadgeIcon: AlertTriangle,
    },
  ]

  const actions: QuickAction[] = [
    {
      label: t('home.actionDeposit'),
      to: '/trade',
      Icon: ArrowDownToLine,
      tileClassName: 'aurum-quick-tile aurum-quick-tile--amber',
    },
    {
      label: t('home.actionWithdraw'),
      to: '/profile',
      Icon: ArrowUpFromLine,
      tileClassName: 'aurum-quick-tile aurum-quick-tile--violet',
    },
    {
      label: t('home.actionDelivery'),
      to: '/profile',
      Icon: Truck,
      tileClassName: 'aurum-quick-tile aurum-quick-tile--sky',
    },
    {
      label: t('home.actionInvoices'),
      to: '/chart',
      Icon: FileText,
      tileClassName: 'aurum-quick-tile aurum-quick-tile--rose',
    },
  ]
  
  return {
    t,
    header,
    assetTabs,
    hero,
    gaugeTicks,
    statusCards,
    actions,
  }
}

export { useHome }
