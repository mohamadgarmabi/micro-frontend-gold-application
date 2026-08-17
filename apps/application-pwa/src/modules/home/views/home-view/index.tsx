import Avatar from '@gold/shared-components/avatar'
import Button from '@gold/shared-components/button'
import { Link } from '@tanstack/react-router'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { Bell, TrendingUp, ArrowUp } from 'lucide-react'
import Card from '#/modules/shell/components/card'
import GoldBadge from '#/modules/shell/components/gold-badge'
import PriceTag from '#/modules/shell/components/price-tag'
import { useHome } from '../../hooks/home.hook'

const HomeView = () => {
  const { t, spotPrice, change, priceData, holdings, markets, activity } = useHome()

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-b from-gold-600/5 to-transparent px-5 pt-12 pb-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest text-foreground-subtle uppercase">
              {t('home.greeting')}
            </p>
            <h2 className="aurum-serif text-xl font-semibold text-foreground">Marcus Chen</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              className="relative size-9 rounded-full border border-border bg-surface-muted p-0 text-foreground-subtle hover:bg-surface-elevated hover:text-foreground"
            >
              <Bell size={16} />
              <span className="absolute top-1.5 end-1.5 h-1.5 w-1.5 rounded-full bg-gold-600" />
            </Button>
            <Avatar className="size-9 bg-gradient-to-br from-gold-600 to-gold-700 text-sm font-semibold text-foreground-on-brand">
              <Avatar.Fallback>MC</Avatar.Fallback>
            </Avatar>
          </div>
        </div>

        <div className="aurum-spot-card mb-4 rounded-2xl p-5">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p className="mb-1 text-xs tracking-widest text-foreground-subtle uppercase">
                {t('home.goldSpotPrice')}
              </p>
              <GoldBadge>XAU/USD</GoldBadge>
            </div>
            <Link
              to="/chart"
              className="flex items-center gap-1 text-xs text-gold-600 no-underline transition-opacity hover:opacity-80"
            >
              <TrendingUp size={12} />
              {t('home.viewChart')}
            </Link>
          </div>
          <PriceTag value={spotPrice} change={change} size="lg" />
          <div className="mt-4 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--ds-brand)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--ds-brand)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="var(--ds-brand)"
                  strokeWidth={1.5}
                  fill="url(#goldGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-5 px-5">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">{t('home.portfolio')}</h3>
            <GoldBadge>
              <ArrowUp size={10} />
              +$611.25
            </GoldBadge>
          </div>
          {holdings.map((holding) => (
            <div key={holding.valueLabel}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{holding.ouncesLabel}</p>
                  <p className="font-mono text-xs text-foreground-subtle">{holding.avgLabel}</p>
                </div>
                <div className="text-end">
                  <p className="font-mono text-sm font-medium text-foreground">
                    {holding.valueLabel}
                  </p>
                  <p className="text-xs text-success">{holding.changeLabel}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-3 flex gap-2 border-t border-border pt-3">
            <Link to="/trade" className="flex-1 no-underline">
              <Button type="button" className="w-full rounded-lg py-2.5 text-xs">
                {t('home.buyGold')}
              </Button>
            </Link>
            <Link to="/trade" className="flex-1 no-underline">
              <Button
                type="button"
                className="w-full rounded-lg border border-border bg-transparent py-2.5 text-xs text-foreground hover:bg-surface-muted"
              >
                {t('home.sellGold')}
              </Button>
            </Link>
          </div>
        </Card>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">{t('home.markets')}</h3>
          <div className="space-y-2">
            {markets.map((asset) => {
              const ChangeIcon = asset.ChangeIcon

              return (
                <Link
                  key={asset.symbol}
                  to="/chart"
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-surface-elevated p-4 no-underline transition-all duration-200 hover:border-gold-600/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-600/15">
                      <span className="font-mono text-xs text-gold-600">{asset.ticker}</span>
                    </div>
                    <div className="text-start">
                      <p className="text-sm font-medium text-foreground">{asset.name}</p>
                      <p className="font-mono text-xs text-foreground-subtle">{asset.symbol}</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="font-mono text-sm font-medium text-foreground">
                      {asset.priceLabel}
                    </p>
                    <p className={asset.changeClassName}>
                      <ChangeIcon size={10} />
                      {asset.changeLabel}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">{t('home.recentActivity')}</h3>
          <div className="space-y-2">
            {activity.map((transaction) => {
              const Icon = transaction.Icon

              return (
                <div
                  key={transaction.date}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={transaction.iconWrapClassName}>
                      <Icon size={14} className={transaction.iconClassName} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{transaction.title}</p>
                      <p className="text-xs text-foreground-subtle">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="font-mono text-sm text-foreground">{transaction.ouncesLabel}</p>
                    <p className="font-mono text-xs text-foreground-subtle">
                      {transaction.priceLabel}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeView
