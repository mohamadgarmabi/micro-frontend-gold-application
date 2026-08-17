import { ArrowDown, ArrowUp } from 'lucide-react'
import { assets, priceData, recentActivity } from '#/modules/market/utils/data'
import { fmt } from '#/modules/market/utils/format'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import type { MessageKey } from '#/modules/shell/types'
import type { ActivityRow, HoldingRow, MarketRow } from '../types'

const assetNameKeys: Record<string, MessageKey> = {
  'XAU/USD': 'market.goldSpot',
  'XAG/USD': 'market.silverSpot',
  'XPT/USD': 'market.platinum',
  'XPD/USD': 'market.palladium',
}

const activityDateKeys: MessageKey[] = [
  'home.activityToday',
  'home.activityJun29',
  'home.activityJun27',
]

const useHome = () => {
  const { t } = useI18n()
  const spotPrice = 3302.45
  const change = 1.28

  const holdings: HoldingRow[] = [
    {
      ouncesLabel: t('home.goldOunces', { amount: '5.00' }),
      avgLabel: t('home.avgPrice', { price: fmt(3180) }),
      valueLabel: `$${fmt(16512.25)}`,
      changeLabel: '+3.84%',
    },
  ]

  const markets: MarketRow[] = assets.map((asset) => {
    const isUp = asset.chg >= 0

    return {
      symbol: asset.symbol,
      ticker: asset.symbol.slice(1, 3),
      name: t(assetNameKeys[asset.symbol] ?? 'market.goldSpot'),
      priceLabel: `$${fmt(asset.price)}`,
      changeLabel: `${Math.abs(asset.chg)}%`,
      changeClassName: isUp
        ? 'flex items-center justify-end gap-0.5 text-xs text-success'
        : 'flex items-center justify-end gap-0.5 text-xs text-danger',
      ChangeIcon: isUp ? ArrowUp : ArrowDown,
    }
  })

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
    spotPrice,
    change,
    priceData,
    holdings,
    markets,
    activity,
  }
}

export { useHome }
