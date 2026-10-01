import type { MarketOverviewResponseDto, MarketTickResponseDto } from "../dto"

const marketOverviewMock: MarketOverviewResponseDto = {
  spotPrice: 3302.45,
  change: 1.28,
  assets: [
    { name: "Gold Spot", symbol: "XAU/USD", price: 3302.45, chg: 1.28 },
    { name: "Silver Spot", symbol: "XAG/USD", price: 32.18, chg: -0.44 },
    { name: "Platinum", symbol: "XPT/USD", price: 988.6, chg: 0.71 },
    { name: "Palladium", symbol: "XPD/USD", price: 972.3, chg: -1.05 },
  ],
  recentActivity: [
    { type: "BUY", oz: 1.0, price: 3268, date: "Today, 11:32" },
    { type: "BUY", oz: 2.0, price: 3195, date: "Jun 29, 09:14" },
    { type: "SELL", oz: 0.5, price: 3240, date: "Jun 27, 15:55" },
  ],
}

const getMarketOverviewMock = () => {
  return structuredClone(marketOverviewMock)
}

const wait = (ms: number) => {
  return new Promise<void>((resolve) => {
    globalThis.setTimeout(resolve, ms)
  })
}

const jitter = (value: number, spread: number) => {
  return Number((value + (Math.random() * 2 - 1) * spread).toFixed(2))
}

/** Infinite mock SSE stream of market ticks (for local / demo). */
const streamMarketTicksMock = (): AsyncIterable<MarketTickResponseDto> => {
  let spotPrice = marketOverviewMock.spotPrice
  let change = marketOverviewMock.change
  const assets = structuredClone(marketOverviewMock.assets)

  return {
    [Symbol.asyncIterator]: () => ({
      next: async () => {
        spotPrice = jitter(spotPrice, 1.5)
        change = jitter(change, 0.08)
        assets[0] = { ...assets[0], price: spotPrice, chg: change }

        for (let index = 1; index < assets.length; index += 1) {
          const asset = assets[index]
          assets[index] = {
            ...asset,
            price: jitter(asset.price, asset.price * 0.002),
            chg: jitter(asset.chg, 0.05),
          }
        }

        await wait(2_000)

        return {
          done: false,
          value: {
            spotPrice,
            change,
            assets: structuredClone(assets),
            at: new Date().toISOString(),
          },
        }
      },
    }),
  }
}

export { getMarketOverviewMock, marketOverviewMock, streamMarketTicksMock }
