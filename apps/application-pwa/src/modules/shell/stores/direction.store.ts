import { createStore } from '@tanstack/store'
import { DEFAULT_DIRECTION } from '#/config/direction.constants'
import type { Direction } from '../types'
import { applyDirection, persistDirection, readDirection } from '../utils/direction.utils'

const directionStore = createStore(DEFAULT_DIRECTION as Direction, ({ setState }) => ({
  hydrate: (nextDirection: Direction) => {
    applyDirection(nextDirection)
    setState(() => nextDirection)
    return nextDirection
  },
  syncFromStorage: () => {
    const nextDirection = readDirection()
    applyDirection(nextDirection)
    persistDirection(nextDirection)
    setState(() => nextDirection)
    return nextDirection
  },
  setDirection: (nextDirection: Direction) => {
    applyDirection(nextDirection)
    persistDirection(nextDirection)
    setState(() => nextDirection)
    return nextDirection
  },
}))

export { directionStore }
