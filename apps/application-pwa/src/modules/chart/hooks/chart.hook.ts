import { useState } from 'react'
import { monthData, priceData, weekData } from '#/modules/market/utils/data'
import { fmt } from '#/modules/market/utils/format'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import type { MessageKey } from '#/modules/shell/types'
import type { ChartRange, ChartStat, OrderBookRow } from '../types'

const ranges: ChartRange[] = ['1D', '1W', '1M']

const dataMap = { '1D': priceData, '1W': weekData, '1M': monthData }

const weekdayKeys: Record<string, MessageKey> = {
  Mon: 'chart.mon',
  Tue: 'chart.tue',
  Wed: 'chart.wed',
  Thu: 'chart.thu',
  Fri: 'chart.fri',
  Sat: 'chart.sat',
  Sun: 'chart.sun',
}

const useChart = () => {
  const { t } = useI18n()
  const [range, setRange] = useState<ChartRange>('1D')
  const data = dataMap[range]
  const latest = data[data.length - 1].price
  const first = data[0].price
  const chgPct = ((latest - first) / first) * 100
  const up = chgPct >= 0
  const chartStroke = up ? 'var(--ds-brand)' : 'var(--ds-danger)'

  const handleRangeChange = (value: string) => {
    setRange(value as ChartRange)
  }

  const chartData = data.map((point) => ({
    ...point,
    time: weekdayKeys[point.time] ? t(weekdayKeys[point.time]) : point.time,
  }))

  const formatAxis = (value: number) => `$${(value / 1000).toFixed(1)}k`

  const formatTooltip = (value: unknown) => {
    const numericValue = typeof value === 'number' ? value : 0
    return [`$${fmt(numericValue)}`, t('chart.price')]
  }

  const stats: ChartStat[] = [
    { label: t('chart.open'), value: `$${fmt(first)}` },
    { label: t('chart.high'), value: `$${fmt(Math.max(...data.map((point) => point.price)))}` },
    { label: t('chart.low'), value: `$${fmt(Math.min(...data.map((point) => point.price)))}` },
    { label: t('chart.volume'), value: t('chart.volumeValue') },
  ]

  const bids: OrderBookRow[] = [3302.1, 3301.8, 3301.4, 3301.0].map((price, index) => ({
    price: fmt(price),
    size: (2.5 - index * 0.4).toFixed(1),
  }))

  const asks: OrderBookRow[] = [3302.45, 3302.8, 3303.2, 3303.6].map((price, index) => ({
    price: fmt(price),
    size: (1.8 + index * 0.3).toFixed(1),
  }))

  return {
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
  }
}

export { useChart }
