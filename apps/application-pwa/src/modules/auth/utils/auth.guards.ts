import { redirect } from '@tanstack/react-router'
import type { AuthContext, AuthSearchParams, SecurityState } from '../types'
import { needsPinUnlock } from './security.utils'

type RequireAuthOptions = {
  auth: AuthContext
  href: string
}

type RedirectIfAuthenticatedOptions = {
  auth: AuthContext
  security: SecurityState
  pathname: string
  redirectTo: AuthSearchParams['redirect']
}

type RequirePinUnlockOptions = {
  auth: AuthContext
  security: SecurityState
  href: string
}

const requireAuth = ({ auth, href }: RequireAuthOptions): void => {
  if (auth.isAuthenticated) {
    return
  }

  throw redirect({
    to: '/login',
    search: { redirect: href },
  })
}

const redirectIfAuthenticated = ({
  auth,
  security,
  pathname,
  redirectTo,
}: RedirectIfAuthenticatedOptions): void => {
  if (!auth.isAuthenticated) {
    return
  }

  if (needsPinUnlock(security)) {
    if (pathname === '/pin') {
      return
    }

    throw redirect({
      to: '/pin',
      search: { redirect: redirectTo },
    })
  }

  throw redirect({ to: redirectTo })
}

const requirePinUnlock = ({ auth, security, href }: RequirePinUnlockOptions): void => {
  if (!auth.isAuthenticated || !needsPinUnlock(security)) {
    return
  }

  throw redirect({
    to: '/pin',
    search: { redirect: href },
  })
}

export { redirectIfAuthenticated, requireAuth, requirePinUnlock }
