import { useEffect, useState } from 'react'

type Direction = 'rtl' | 'ltr'

const DIRECTION_STORAGE_KEY = 'aurum:direction'

function readDirection(): Direction {
  if (typeof window === 'undefined') {
    return 'rtl'
  }

  const stored = localStorage.getItem(DIRECTION_STORAGE_KEY)
  return stored === 'ltr' || stored === 'rtl' ? stored : 'rtl'
}

function useDirection() {
  const [direction, setDirection] = useState<Direction>(readDirection)

  useEffect(() => {
    document.documentElement.dir = direction
    document.documentElement.lang = direction === 'rtl' ? 'fa' : 'en'
    localStorage.setItem(DIRECTION_STORAGE_KEY, direction)
  }, [direction])

  const toggleDirection = () => {
    setDirection((current) => (current === 'rtl' ? 'ltr' : 'rtl'))
  }

  return {
    direction,
    setDirection,
    isRtl: direction === 'rtl',
    toggleDirection,
  }
}

export { useDirection };
export type { Direction };
