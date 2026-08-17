import type { AuthContext, AuthSearchParams } from '../types'

const resolveAuthContext = (token: string | null): AuthContext => {
  return {
    token,
    isAuthenticated: Boolean(token),
  }
}

const resolveRedirectSearch = (search: unknown): AuthSearchParams['redirect'] => {
  if (
    typeof search === 'object' &&
    search !== null &&
    'redirect' in search &&
    typeof search.redirect === 'string'
  ) {
    return search.redirect
  }

  return '/home'
}

export { resolveAuthContext, resolveRedirectSearch }
