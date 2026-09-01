import { useNavigate } from '@tanstack/react-router'
import { ArrowDownToLine, ArrowUpFromLine, FileText, Truck } from 'lucide-react'
import { assets, recentActivity, SPOT_PRICE } from '#/modules/market/utils/data'
import { fmt } from '#/modules/market/utils/format'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import type { MessageKey } from '#/modules/shell/types'
import type {
  HomeActivityRow,
  HomeHeaderModel,
  HomeMarketRow,
  HomeQuoteModel,
  HomeTradeAction,
  HomeWallet,
  QuickAction,
} from '../types'

const CASH_TOMAN = '12,450,000'
const VAULT_SOT = '1,250'
const GOLD_CHANGE = 1.28
const QUICK_TILE_CLASS =
  'flex size-14 mx-auto items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-foreground'

const marketNameKey: Record<string, MessageKey> = {
  'XAU/USD': 'market.goldSpot',
  'XAG/USD': 'market.silverSpot',
  'XPT/USD': 'market.platinum',
  'XPD/USD': 'market.palladium',
}

const greetingKey = (hour: number) => {
  if (hour < 12) {
    return 'home.greeting' as const
  }

  if (hour < 18) {
    return 'home.greetingAfternoon' as const
  }

  return 'home.greetingEvening' as const
}

const useHome = () => {
  const { t } = useI18n()
  const navigate = useNavigate()

  const openChart = () => {
    void navigate({ to: '/chart' })
  }

  const openTrade = () => {
    void navigate({ to: '/trade' })
  }

  const header: HomeHeaderModel = {
    greeting: t(greetingKey(new Date().getHours())),
    brandName: t('home.brand'),
    onOpenChart: openChart,
  }

  const quote: HomeQuoteModel = {
    eyebrow: t('home.goldSpotPrice'),
    pairLabel: t('home.pairXau'),
    liveLabel: t('home.liveNow'),
    chartLabel: t('home.viewChart'),
    price: SPOT_PRICE,
    change: GOLD_CHANGE,
    onOpenChart: openChart,
  }

  const tradeActions: HomeTradeAction[] = [
    {
      label: t('home.buyGold'),
      variant: 'primary',
      onSelect: openTrade,
    },
    {
      label: t('home.sellGold'),
      variant: 'danger',
      onSelect: openTrade,
    },
  ]

  const wallets: HomeWallet[] = [
    {
      id: 'cash',
      label: t('home.walletCash'),
      value: t('home.cashValue', { amount: CASH_TOMAN }),
      hint: t('home.cashHint'),
    },
    {
      id: 'gold',
      label: t('home.walletGold'),
      value: t('home.goldVaultValue', { amount: VAULT_SOT }),
      hint: t('home.goldOunces', { amount: '12.50' }),
    },
  ]

  const actions: QuickAction[] = [
    { label: t('home.actionDeposit'), to: '/trade', Icon: ArrowDownToLine, tileClassName: QUICK_TILE_CLASS },
    { label: t('home.actionWithdraw'), to: '/profile', Icon: ArrowUpFromLine, tileClassName: QUICK_TILE_CLASS },
    { label: t('home.actionDelivery'), to: '/profile', Icon: Truck, tileClassName: QUICK_TILE_CLASS },
    { label: t('home.actionInvoices'), to: '/chart', Icon: FileText, tileClassName: QUICK_TILE_CLASS },
  ]

  const markets: HomeMarketRow[] = assets.map((asset) => ({
    id: asset.symbol,
    name: t(marketNameKey[asset.symbol] ?? 'market.goldSpot'),
    symbol: asset.symbol,
    price: asset.price,
    change: asset.chg,
    onSelect: openChart,
    className:
      'flex w-full items-center justify-between rounded-[var(--radius)] border border-border bg-surface px-4 py-3 text-start',
  }))

  const activity: HomeActivityRow[] = recentActivity.map((row, index) => {
    const isBuy = row.type === 'BUY'

    return {
      id: `${row.date}-${index}`,
      sideLabel: isBuy ? t('home.buyGoldAction') : t('home.sellGoldAction'),
      sideColorClassName: isBuy ? 'text-success' : 'text-danger',
      date: row.date,
      ouncesLabel: `${row.oz} oz`,
      priceLabel: `$${fmt(row.price)}`,
      className:
        'flex items-center justify-between rounded-[var(--radius)] border border-border bg-surface px-4 py-3',
    }
  })

  return { t, header, quote, tradeActions, wallets, actions, markets, activity }
}

export { useHome }
