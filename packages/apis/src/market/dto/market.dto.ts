type MarketAssetDto = {
  name: string
  symbol: string
  price: number
  chg: number
}

type MarketActivityDto = {
  type: "BUY" | "SELL"
  oz: number
  price: number
  date: string
}

type MarketOverviewDto = {
  spotPrice: number
  change: number
  assets: MarketAssetDto[]
  recentActivity: MarketActivityDto[]
}

/** Live quote tick pushed over SSE (`/v1/market/ticks`). */
type MarketTickDto = {
  spotPrice: number
  change: number
  assets: MarketAssetDto[]
  at: string
}

export type { MarketActivityDto, MarketAssetDto, MarketOverviewDto, MarketTickDto }
