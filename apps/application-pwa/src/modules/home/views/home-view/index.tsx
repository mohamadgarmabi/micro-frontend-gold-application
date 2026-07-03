import Avatar from '@gold/shared-components/avatar'
import Button from '@gold/shared-components/button'
import { Link } from '@tanstack/react-router'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { ArrowDown, ArrowUp, Bell, TrendingUp } from 'lucide-react'
import { assets, priceData, recentActivity } from '#/modules/market/utils/data'
import { fmt } from '#/modules/market/utils/format'
import Card from '#/modules/shell/components/card'
import GoldBadge from '#/modules/shell/components/gold-badge'
import PriceTag from '#/modules/shell/components/price-tag'

function HomeView() {
  const spotPrice = 3302.45
  const change = 1.28
  const holdings = [{ oz: 5.0, avg: 3180, value: 16512.25 }]

  return (
    <div className="min-h-screen pb-24">
        <div className="bg-gradient-to-b from-gold-600/5 to-transparent px-5 pt-12 pb-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs tracking-widest text-foreground-subtle uppercase">
                Good morning
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
                  Gold Spot Price
                </p>
                <GoldBadge>XAU/USD</GoldBadge>
              </div>
              <Link
                to="/chart"
                className="flex items-center gap-1 text-xs text-gold-600 no-underline transition-opacity hover:opacity-80"
              >
                <TrendingUp size={12} />
                View Chart
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
              <h3 className="text-sm font-semibold text-foreground">Portfolio</h3>
              <GoldBadge>
                <ArrowUp size={10} />
                +$611.25
              </GoldBadge>
            </div>
            {holdings.map((h, i) => (
              <div key={i}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">5.00 oz Gold</p>
                    <p className="font-mono text-xs text-foreground-subtle">Avg ${fmt(h.avg)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-medium text-foreground">
                      ${fmt(h.value)}
                    </p>
                    <p className="text-xs text-success">+3.84%</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-3 flex gap-2 border-t border-border pt-3">
              <Link to="/trade" className="flex-1 no-underline">
                <Button type="button" className="w-full rounded-lg py-2.5 text-xs">
                  Buy Gold
                </Button>
              </Link>
              <Link to="/trade" className="flex-1 no-underline">
                <Button
                  type="button"
                  className="w-full rounded-lg border border-border bg-transparent py-2.5 text-xs text-foreground hover:bg-surface-muted"
                >
                  Sell Gold
                </Button>
              </Link>
            </div>
          </Card>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Markets</h3>
            <div className="space-y-2">
              {assets.map((a) => (
                <Link
                  key={a.symbol}
                  to="/chart"
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-surface-elevated p-4 no-underline transition-all duration-200 hover:border-gold-600/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-600/15">
                      <span className="font-mono text-xs text-gold-600">{a.symbol.slice(1, 3)}</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{a.name}</p>
                      <p className="font-mono text-xs text-foreground-subtle">{a.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-medium text-foreground">
                      ${fmt(a.price)}
                    </p>
                    <p
                      className={`flex items-center justify-end gap-0.5 text-xs ${a.chg >= 0 ? 'text-success' : 'text-danger'}`}
                    >
                      {a.chg >= 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                      {Math.abs(a.chg)}%
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Recent Activity</h3>
            <div className="space-y-2">
              {recentActivity.map((tx, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${tx.type === 'BUY' ? 'bg-success-muted' : 'bg-danger-muted'}`}
                    >
                      {tx.type === 'BUY' ? (
                        <ArrowDown size={14} className="text-success" />
                      ) : (
                        <ArrowUp size={14} className="text-danger" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{tx.type} Gold</p>
                      <p className="text-xs text-foreground-subtle">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-foreground">{tx.oz} oz</p>
                    <p className="font-mono text-xs text-foreground-subtle">@${fmt(tx.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default HomeView
