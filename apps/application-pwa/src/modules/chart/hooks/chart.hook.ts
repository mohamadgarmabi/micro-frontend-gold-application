import { useState } from 'react'
import { monthData, priceData, weekData } from '#/modules/market/utils/data'

const ranges = ['1D', '1W', '1M'] as const
type ChartRange = (typeof ranges)[number]

const dataMap = { '1D': priceData, '1W': weekData, '1M': monthData }

function useChart() {
  const [range, setRange] = useState<ChartRange>('1D')
  const data = dataMap[range]
  const latest = data[data.length - 1].price
  const first = data[0].price
  const chgPct = ((latest - first) / first) * 100
  const up = chgPct >= 0

  return { range, setRange, ranges, data, latest, first, chgPct, up }
}

export { useChart }
