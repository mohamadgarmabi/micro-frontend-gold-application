type MarketAssetDto = {
  name: string
  symbol: string
  price: number
  chg: number
}

type MarketActivityDto = {
  type: 'BUY' | 'SELL'
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

export type { MarketActivityDto, MarketAssetDto, MarketOverviewDto }
