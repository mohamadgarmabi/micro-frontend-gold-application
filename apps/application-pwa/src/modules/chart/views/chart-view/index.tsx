import Tabs from '@gold/shared-components/tabs'
import { fmt } from '#/modules/market/utils/format'
import Card from '#/modules/shell/components/card'
import GoldBadge from '#/modules/shell/components/gold-badge'
import PriceTag from '#/modules/shell/components/price-tag'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useChart } from '../../hooks/chart.hook'

function ChartView() {
  const { range, setRange, ranges, data, latest, first, chgPct, up } = useChart()

  return (
    <div className="min-h-screen pb-24">
        <div className="px-5 pt-12 pb-4">
          <div className="mb-1 flex items-center justify-between">
            <div>
              <p className="text-xs tracking-widest text-foreground-subtle uppercase">Gold Spot</p>
              <h2 className="aurum-serif text-xl font-semibold text-foreground">XAU / USD</h2>
            </div>
            <GoldBadge>Live</GoldBadge>
          </div>
          <PriceTag value={latest} change={chgPct} size="lg" />
        </div>

        <Tabs
          value={range}
          onValueChange={(value) => setRange(value as typeof range)}
          className="mb-4 px-5"
        >
          <Tabs.List className="w-full">
            {ranges.map((r) => (
              <Tabs.Tab key={r} value={r} className="flex-1">
                {r}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>

        <div className="mb-6 px-3" style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
              <defs>
                <linearGradient id="goldGradMain" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={up ? 'var(--ds-brand)' : 'var(--ds-danger)'}
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor={up ? 'var(--ds-brand)' : 'var(--ds-danger)'}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="color-mix(in oklab, var(--ds-brand) 6%, transparent)" />
              <XAxis
                dataKey="time"
                tick={{ fill: 'var(--ds-foreground-subtle)', fontSize: 10, fontFamily: 'DM Mono, monospace' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={['auto', 'auto']}
                tick={{ fill: 'var(--ds-foreground-subtle)', fontSize: 10, fontFamily: 'DM Mono, monospace' }}
                axisLine={false}
                tickLine={false}
                width={55}
                tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--ds-surface-elevated)',
                  border: '1px solid var(--ds-border)',
                  borderRadius: 10,
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 12,
                  color: 'var(--ds-foreground)',
                }}
                formatter={(val) => [`$${fmt(Number(val))}`, 'Price']}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={up ? 'var(--ds-brand)' : 'var(--ds-danger)'}
                strokeWidth={2}
                fill="url(#goldGradMain)"
                dot={false}
                activeDot={{ r: 4, fill: 'var(--ds-brand)', strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3 px-5">
          {[
            { label: 'Open', val: `$${fmt(first)}` },
            { label: 'High', val: `$${fmt(Math.max(...data.map((d) => d.price)))}` },
            { label: 'Low', val: `$${fmt(Math.min(...data.map((d) => d.price)))}` },
            { label: 'Volume', val: '14,820 oz' },
          ].map(({ label, val }) => (
            <Card key={label} className="py-3">
              <p className="mb-1 text-xs tracking-widest text-foreground-subtle uppercase">
                {label}
              </p>
              <p className="font-mono text-sm font-medium text-foreground">{val}</p>
            </Card>
          ))}
        </div>

        <div className="px-5">
          <Card>
            <p className="mb-3 text-xs tracking-widest text-foreground-subtle uppercase">
              Order Book
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2 text-xs text-success">Bids</p>
                {[3302.1, 3301.8, 3301.4, 3301.0].map((p, i) => (
                  <div key={i} className="mb-1.5 flex justify-between text-xs">
                    <span className="font-mono text-success">{fmt(p)}</span>
                    <span className="font-mono text-foreground-subtle">
                      {(2.5 - i * 0.4).toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className="mb-2 text-xs text-danger">Asks</p>
                {[3302.45, 3302.8, 3303.2, 3303.6].map((p, i) => (
                  <div key={i} className="mb-1.5 flex justify-between text-xs">
                    <span className="font-mono text-danger">{fmt(p)}</span>
                    <span className="font-mono text-foreground-subtle">
                      {(1.8 + i * 0.3).toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
    </div>
  )
}

export default ChartView
