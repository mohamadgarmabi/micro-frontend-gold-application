import type { MarketOverviewDto } from '../dto'

const marketOverviewMock: MarketOverviewDto = {
  spotPrice: 3302.45,
  change: 1.28,
  assets: [
    { name: 'Gold Spot', symbol: 'XAU/USD', price: 3302.45, chg: 1.28 },
    { name: 'Silver Spot', symbol: 'XAG/USD', price: 32.18, chg: -0.44 },
    { name: 'Platinum', symbol: 'XPT/USD', price: 988.6, chg: 0.71 },
    { name: 'Palladium', symbol: 'XPD/USD', price: 972.3, chg: -1.05 },
  ],
  recentActivity: [
    { type: 'BUY', oz: 1.0, price: 3268, date: 'Today, 11:32' },
    { type: 'BUY', oz: 2.0, price: 3195, date: 'Jun 29, 09:14' },
    { type: 'SELL', oz: 0.5, price: 3240, date: 'Jun 27, 15:55' },
  ],
}

const getMarketOverviewMock = () => {
  return structuredClone(marketOverviewMock)
}

export { getMarketOverviewMock, marketOverviewMock }
