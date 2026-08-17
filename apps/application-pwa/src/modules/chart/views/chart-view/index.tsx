import Tabs from '@gold/shared-components/tabs'
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

const ChartView = () => {
  const {
    t,
    range,
    ranges,
    handleRangeChange,
    chartData,
    latest,
    chgPct,
    chartStroke,
    formatAxis,
    formatTooltip,
    stats,
    bids,
    asks,
  } = useChart()

  return (
    <div className="min-h-screen pb-24">
      <div className="px-5 pt-12 pb-4">
        <div className="mb-1 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest text-foreground-subtle uppercase">
              {t('chart.goldSpot')}
            </p>
            <h2 className="aurum-serif text-xl font-semibold text-foreground">XAU / USD</h2>
          </div>
          <GoldBadge>{t('chart.live')}</GoldBadge>
        </div>
        <PriceTag value={latest} change={chgPct} size="lg" />
      </div>

      <Tabs value={range} onValueChange={handleRangeChange} className="mb-4 px-5">
        <Tabs.List className="w-full">
          {ranges.map((item) => (
            <Tabs.Tab key={item} value={item} className="flex-1">
              {item}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      <div className="mb-6 px-3" style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <defs>
              <linearGradient id="goldGradMain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartStroke} stopOpacity={0.25} />
                <stop offset="95%" stopColor={chartStroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="color-mix(in oklab, var(--ds-brand) 6%, transparent)"
            />
            <XAxis
              dataKey="time"
              tick={{
                fill: 'var(--ds-foreground-subtle)',
                fontSize: 10,
                fontFamily: 'DM Mono, monospace',
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={['auto', 'auto']}
              tick={{
                fill: 'var(--ds-foreground-subtle)',
                fontSize: 10,
                fontFamily: 'DM Mono, monospace',
              }}
              axisLine={false}
              tickLine={false}
              width={55}
              tickFormatter={formatAxis}
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
              formatter={formatTooltip}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={chartStroke}
              strokeWidth={2}
              fill="url(#goldGradMain)"
              dot={false}
              activeDot={{ r: 4, fill: 'var(--ds-brand)', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 px-5">
        {stats.map((stat) => (
          <Card key={stat.label} className="py-3">
            <p className="mb-1 text-xs tracking-widest text-foreground-subtle uppercase">
              {stat.label}
            </p>
            <p className="font-mono text-sm font-medium text-foreground">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="px-5">
        <Card>
          <p className="mb-3 text-xs tracking-widest text-foreground-subtle uppercase">
            {t('chart.orderBook')}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-2 text-xs text-success">{t('chart.bids')}</p>
              {bids.map((row) => (
                <div key={row.price} className="mb-1.5 flex justify-between text-xs">
                  <span className="font-mono text-success">{row.price}</span>
                  <span className="font-mono text-foreground-subtle">{row.size}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="mb-2 text-xs text-danger">{t('chart.asks')}</p>
              {asks.map((row) => (
                <div key={row.price} className="mb-1.5 flex justify-between text-xs">
                  <span className="font-mono text-danger">{row.price}</span>
                  <span className="font-mono text-foreground-subtle">{row.size}</span>
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
