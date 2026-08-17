type TradeSide = 'buy' | 'sell'

type OrderRow = {
  label: string
  value: string
}

type QuickAmount = {
  value: number
  label: string
  onSelect: () => void
}

export type { OrderRow, QuickAmount, TradeSide }
