import type { GaugeTick } from '../types'

const GAUGE_TICK_COUNT = 41
const GAUGE_START_DEG = -118
const GAUGE_SWEEP_DEG = 236
const GAUGE_PROGRESS = 0.68

const buildGaugeTicks = (): GaugeTick[] => {
  return Array.from({ length: GAUGE_TICK_COUNT }, (_, index) => {
    const progress = index / (GAUGE_TICK_COUNT - 1)
    const angle = GAUGE_START_DEG + GAUGE_SWEEP_DEG * progress
    const isMarker = Math.abs(progress - GAUGE_PROGRESS) < 1 / (GAUGE_TICK_COUNT - 1)
    const isFilled = progress <= GAUGE_PROGRESS
    const tone = isMarker ? 'is-marker' : isFilled ? 'is-filled' : ''

    return {
      id: `tick-${index}`,
      className: `aurum-gauge__tick ${tone}`.trim(),
      style: { transform: `rotate(${angle}deg) translateY(-6.6rem)` },
    }
  })
}

const gaugeTicks = buildGaugeTicks()

export { gaugeTicks }
