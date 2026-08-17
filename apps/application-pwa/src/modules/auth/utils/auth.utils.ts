import type { AuthContext } from '../types'

function resolveAuthContext(token: string | null): AuthContext {
  return {
    token,
    isAuthenticated: Boolean(token),
  }
}

export { resolveAuthContext }
