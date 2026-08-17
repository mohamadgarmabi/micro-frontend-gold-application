import { redirect } from '@tanstack/react-router'
import type { AuthContext, AuthSearchParams } from '../types'

type RequireAuthOptions = {
  auth: AuthContext
  href: string
}

type RedirectIfAuthenticatedOptions = {
  auth: AuthContext
  redirectTo: AuthSearchParams['redirect']
}

function requireAuth({ auth, href }: RequireAuthOptions): void {
  if (auth.isAuthenticated) {
    return
  }

  throw redirect({
    to: '/login',
    search: { redirect: href },
  })
}

function redirectIfAuthenticated({
  auth,
  redirectTo,
}: RedirectIfAuthenticatedOptions): void {
  if (!auth.isAuthenticated) {
    return
  }

  throw redirect({ to: redirectTo })
}

export { redirectIfAuthenticated, requireAuth }
