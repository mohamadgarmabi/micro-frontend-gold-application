import { useSelector } from '@tanstack/react-store'
import { useEffect } from 'react'
import { directionStore } from '../stores/direction.store'
import type { Direction } from '../types'

const useDirection = () => {
  const direction: Direction = useSelector(directionStore, (state) => state)

  useEffect(() => {
    directionStore.actions.syncFromStorage()
  }, [])

  const setDirection = (nextDirection: Direction) => {
    directionStore.actions.setDirection(nextDirection)
  }

  const toggleDirection = () => {
    setDirection(direction === 'rtl' ? 'ltr' : 'rtl')
  }

  const toasterPosition = direction === 'rtl' ? ('top-left' as const) : ('top-right' as const)

  return {
    direction,
    setDirection,
    isRtl: direction === 'rtl',
    toasterPosition,
    toggleDirection,
  }
}

export { useDirection }
export type { Direction }
