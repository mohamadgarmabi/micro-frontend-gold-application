import { createIsomorphicFn } from '@tanstack/react-start'
import { AUTH_TOKEN_COOKIE_NAME } from '#/config/auth.constants'
import { authStore } from '../stores/auth.store'
import { resolveAuthContext } from '../utils/auth.utils'

const getAuthSession = createIsomorphicFn()
  .server(async () => {
    const { getCookie } = await import('@tanstack/react-start/server')
    const token = getCookie(AUTH_TOKEN_COOKIE_NAME) ?? null

    return resolveAuthContext(token)
  })
  .client(async () => authStore.actions.syncFromCookie())

export { getAuthSession }
