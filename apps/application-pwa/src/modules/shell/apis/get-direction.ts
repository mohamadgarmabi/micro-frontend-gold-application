import { createIsomorphicFn } from '@tanstack/react-start'
import { DEFAULT_DIRECTION, DIRECTION_COOKIE_NAME } from '#/config/direction.constants'
import type { Direction } from '../types'
import { readDirection } from '../utils/direction.utils'

const resolveDirection = (value: string | undefined): Direction => {
  return value === 'ltr' || value === 'rtl' ? value : DEFAULT_DIRECTION
}

const getDirectionPreference = createIsomorphicFn()
  .server(async () => {
    const { getCookie } = await import('@tanstack/react-start/server')
    return resolveDirection(getCookie(DIRECTION_COOKIE_NAME))
  })
  .client(async () => readDirection())

export { getDirectionPreference }
