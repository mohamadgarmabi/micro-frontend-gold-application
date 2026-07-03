import type { PricePoint } from '../types'

const priceData: PricePoint[] = [
  { time: '09:00', price: 3210, open: 3200, high: 3225, low: 3195, close: 3210, vol: 142 },
  { time: '09:30', price: 3198, open: 3210, high: 3215, low: 3190, close: 3198, vol: 98 },
  { time: '10:00', price: 3225, open: 3198, high: 3235, low: 3196, close: 3225, vol: 211 },
  { time: '10:30', price: 3240, open: 3225, high: 3250, low: 3220, close: 3240, vol: 178 },
  { time: '11:00', price: 3232, open: 3240, high: 3245, low: 3228, close: 3232, vol: 134 },
  { time: '11:30', price: 3255, open: 3232, high: 3265, low: 3230, close: 3255, vol: 256 },
  { time: '12:00', price: 3268, open: 3255, high: 3275, low: 3252, close: 3268, vol: 189 },
  { time: '12:30', price: 3261, open: 3268, high: 3270, low: 3255, close: 3261, vol: 112 },
  { time: '13:00', price: 3278, open: 3261, high: 3285, low: 3259, close: 3278, vol: 203 },
  { time: '13:30', price: 3290, open: 3278, high: 3298, low: 3275, close: 3290, vol: 231 },
  { time: '14:00', price: 3285, open: 3290, high: 3295, low: 3280, close: 3285, vol: 167 },
  { time: '14:30', price: 3302, open: 3285, high: 3310, low: 3283, close: 3302, vol: 288 },
]

const weekData: PricePoint[] = [
  { time: 'Mon', price: 3180 },
  { time: 'Tue', price: 3205 },
  { time: 'Wed', price: 3195 },
  { time: 'Thu', price: 3240 },
  { time: 'Fri', price: 3268 },
  { time: 'Sat', price: 3285 },
  { time: 'Sun', price: 3302 },
]

const monthData: PricePoint[] = Array.from({ length: 30 }, (_, i) => ({
  time: `${i + 1}`,
  price: 3050 + Math.sin(i * 0.4) * 80 + i * 8 + Math.random() * 30,
}))

const assets = [
  { name: 'Gold Spot', symbol: 'XAU/USD', price: 3302.45, chg: 1.28 },
  { name: 'Silver Spot', symbol: 'XAG/USD', price: 32.18, chg: -0.44 },
  { name: 'Platinum', symbol: 'XPT/USD', price: 988.6, chg: 0.71 },
  { name: 'Palladium', symbol: 'XPD/USD', price: 972.3, chg: -1.05 },
]

const recentActivity = [
  { type: 'BUY' as const, oz: 1.0, price: 3268, date: 'Today, 11:32' },
  { type: 'BUY' as const, oz: 2.0, price: 3195, date: 'Jun 29, 09:14' },
  { type: 'SELL' as const, oz: 0.5, price: 3240, date: 'Jun 27, 15:55' },
]

const SPOT_PRICE = 3302.45

export { priceData, weekData, monthData, assets, recentActivity, SPOT_PRICE }
