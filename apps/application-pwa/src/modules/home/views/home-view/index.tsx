import Avatar from '@gold/shared-components/avatar'
import Button from '@gold/shared-components/button'
import { Link } from '@tanstack/react-router'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { Bell } from 'lucide-react'
import PriceTag from '#/modules/shell/components/price-tag'
import { useHome } from '../../hooks/home.hook'

const HomeView = () => {
  const { t, spotPrice, change, unitLabel, priceData, assetTabs, wallets, actions, activity } =
    useHome()

  return (
    <div className="min-h-screen pb-24">
      <div className="px-5 pt-12 pb-4">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-foreground-subtle">{t('home.greeting')}</p>
            <h2 className="text-lg font-semibold text-foreground">Aurum</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              className="relative size-9 rounded-full border border-border bg-surface p-0 text-foreground-subtle hover:bg-surface-muted hover:text-foreground"
            >
              <Bell size={16} />
              <span className="absolute top-1.5 end-1.5 h-1.5 w-1.5 rounded-full bg-gold-600" />
            </Button>
            <Avatar className="size-9 bg-button text-sm font-semibold text-button-foreground">
              <Avatar.Fallback>MC</Avatar.Fallback>
            </Avatar>
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          {assetTabs.map((tab) => (
            <button key={tab.id} type="button" onClick={tab.onSelect} className={tab.className}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="aurum-spot-card rounded-3xl p-5">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-xs text-foreground-subtle">{t('home.goldSpotPrice')}</p>
            <Link to="/chart" className="text-xs font-medium text-gold-600 no-underline">
              {t('home.viewChart')}
            </Link>
          </div>
          <div className="flex items-end gap-2">
            <PriceTag value={spotPrice} change={change} size="lg" />
            <span className="mb-1 text-xs text-foreground-subtle">{unitLabel}</span>
          </div>
          <div className="mt-3 h-14">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--ds-brand)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--ds-brand)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="var(--ds-brand)"
                  strokeWidth={1.75}
                  fill="url(#goldGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link to="/trade" className="no-underline">
            <Button type="button" className="w-full rounded-2xl py-3.5 text-sm font-semibold">
              {t('home.buyGold')}
            </Button>
          </Link>
          <Link to="/trade" className="no-underline">
            <Button
              type="button"
              className="w-full rounded-2xl border border-gold-600 bg-transparent py-3.5 text-sm font-semibold text-gold-600 hover:bg-gold-600/10"
            >
              {t('home.sellGold')}
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-5 px-5">
        <div className="grid grid-cols-2 gap-2">
          {wallets.map((wallet) => (
            <div
              key={wallet.label}
              className="rounded-2xl border border-border bg-surface-elevated p-4"
            >
              <p className="text-xs text-foreground-subtle">{wallet.label}</p>
              <p className="mt-1 font-mono text-sm font-semibold text-foreground">{wallet.value}</p>
              <p className="mt-0.5 text-[10px] text-foreground-subtle">{wallet.hint}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {actions.map((action) => {
            const Icon = action.Icon

            return (
              <Link
                key={action.label}
                to={action.to}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface-elevated px-1 py-3 no-underline"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-600/10 text-gold-600">
                  <Icon size={16} />
                </span>
                <span className="text-[10px] text-foreground">{action.label}</span>
              </Link>
            )
          })}
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">{t('home.recentActivity')}</h3>
          <div className="space-y-2">
            {activity.map((transaction) => {
              const Icon = transaction.Icon

              return (
                <div
                  key={transaction.date}
                  className="flex items-center justify-between rounded-2xl border border-border bg-surface-elevated p-3"
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
