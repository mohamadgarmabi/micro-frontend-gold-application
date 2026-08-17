import {
  DEFAULT_DIRECTION,
  DIRECTION_COOKIE_NAME,
  DIRECTION_STORAGE_KEY,
} from '#/config/direction.constants'
import type { Direction } from '../types'

const isDirection = (value: string | null): value is Direction => {
  return value === 'ltr' || value === 'rtl'
}

const readCookieDirection = (): Direction | null => {
  if (typeof document === 'undefined') {
    return null
  }

  const match = document.cookie.match(new RegExp(`(?:^|; )${DIRECTION_COOKIE_NAME}=([^;]+)`))
  const value = match ? decodeURIComponent(match[1]) : null

  return isDirection(value) ? value : null
}

const readDirection = (): Direction => {
  if (typeof window === 'undefined') {
    return DEFAULT_DIRECTION
  }

  const stored = localStorage.getItem(DIRECTION_STORAGE_KEY)

  if (isDirection(stored)) {
    return stored
  }

  return readCookieDirection() ?? DEFAULT_DIRECTION
}

const applyDirection = (direction: Direction) => {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.dir = direction
  document.documentElement.lang = direction === 'rtl' ? 'fa' : 'en'
}

const persistDirection = (direction: Direction) => {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(DIRECTION_STORAGE_KEY, direction)
  document.cookie = `${DIRECTION_COOKIE_NAME}=${direction}; path=/; max-age=31536000; SameSite=Lax`
}

export { applyDirection, persistDirection, readDirection }
