import { useState } from 'react'
import { ArrowDown, ArrowDownToLine, ArrowUp, ArrowUpFromLine, FileText, Truck } from 'lucide-react'
import { priceData, recentActivity } from '#/modules/market/utils/data'
import { fmt } from '#/modules/market/utils/format'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import type { MessageKey } from '#/modules/shell/types'
import type { ActivityRow, AssetId, AssetTab, QuickAction, WalletTile } from '../types'

const activityDateKeys: MessageKey[] = [
  'home.activityToday',
  'home.activityJun29',
  'home.activityJun27',
]

const assetClassName = {
  active: 'rounded-full bg-button px-4 py-1.5 text-xs font-semibold text-button-foreground',
  idle: 'rounded-full bg-surface-muted px-4 py-1.5 text-xs font-medium text-foreground-subtle',
} as const

const quotes = {
  gold: { price: 3302.45, change: 1.28 },
  silver: { price: 32.18, change: -0.44 },
} as const

const useHome = () => {
  const { t } = useI18n()
  const [asset, setAsset] = useState<AssetId>('gold')
  const quote = quotes[asset]

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

  const wallets: WalletTile[] = [
    {
      label: t('home.walletCash'),
      value: t('home.cashValue', { amount: '12,480,000' }),
      hint: t('profile.availableToTrade'),
    },
    {
      label: t('home.walletGold'),
      value: t('home.goldVaultValue', { amount: '1,250' }),
      hint: t('home.assetGold'),
    },
  ]

  const actions: QuickAction[] = [
    { label: t('home.actionDeposit'), to: '/trade', Icon: ArrowDownToLine },
    { label: t('home.actionWithdraw'), to: '/profile', Icon: ArrowUpFromLine },
    { label: t('home.actionDelivery'), to: '/profile', Icon: Truck },
    { label: t('home.actionInvoices'), to: '/chart', Icon: FileText },
  ]

  const activity: ActivityRow[] = recentActivity.map((transaction, index) => {
    const isBuy = transaction.type === 'BUY'

    return {
      type: transaction.type,
      title: t(isBuy ? 'home.buyGoldAction' : 'home.sellGoldAction'),
      date: t(activityDateKeys[index] ?? 'home.activityToday'),
      ouncesLabel: `${transaction.oz} oz`,
      priceLabel: `@$${fmt(transaction.price)}`,
      iconWrapClassName: isBuy
        ? 'flex h-8 w-8 items-center justify-center rounded-full bg-success-muted'
        : 'flex h-8 w-8 items-center justify-center rounded-full bg-danger-muted',
      Icon: isBuy ? ArrowDown : ArrowUp,
      iconClassName: isBuy ? 'text-success' : 'text-danger',
    }
  })

  return {
    t,
    spotPrice: quote.price,
    change: quote.change,
    unitLabel: t('home.unitGram'),
    priceData,
    assetTabs,
    wallets,
    actions,
    activity,
  }
}

export { useHome }
