type MarketAssetResponseDto = {
  name: string
  symbol: string
  price: number
  chg: number
}

type MarketActivityResponseDto = {
  type: "BUY" | "SELL"
  oz: number
  price: number
  date: string
}

type MarketOverviewResponseDto = {
  spotPrice: number
  change: number
  assets: MarketAssetResponseDto[]
  recentActivity: MarketActivityResponseDto[]
}

/** Live quote tick pushed over SSE (`/v1/market/ticks`). */
type MarketTickResponseDto = {
  spotPrice: number
  change: number
  assets: MarketAssetResponseDto[]
  at: string
}

export type {
  MarketActivityResponseDto,
  MarketAssetResponseDto,
  MarketOverviewResponseDto,
  MarketTickResponseDto,
}
