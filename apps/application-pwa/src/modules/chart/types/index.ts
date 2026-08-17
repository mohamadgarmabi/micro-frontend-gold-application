type ChartRange = '1D' | '1W' | '1M'

type ChartStat = {
  label: string
  value: string
}

type OrderBookRow = {
  price: string
  size: string
}

export type { ChartRange, ChartStat, OrderBookRow }
