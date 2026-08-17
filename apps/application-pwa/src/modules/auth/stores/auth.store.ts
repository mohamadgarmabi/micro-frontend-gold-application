import { createStore } from '@tanstack/store'
import { clearAuthToken, getAuthToken, setAuthToken } from '@gold/apis'
import type { AuthContext } from '../types'
import { resolveAuthContext } from '../utils/auth.utils'

const authStore = createStore(resolveAuthContext(null), ({ setState, get }) => ({
  syncFromCookie: (cookieSource?: string): AuthContext => {
    const nextState = resolveAuthContext(getAuthToken(cookieSource))
    setState(() => nextState)
    return get()
  },
  setSession: (token: string): AuthContext => {
    setAuthToken(token)
    const nextState = resolveAuthContext(token)
    setState(() => nextState)
    return get()
  },
  clearSession: (): AuthContext => {
    clearAuthToken()
    const nextState = resolveAuthContext(null)
    setState(() => nextState)
    return get()
  },
}))

const getAuthContext = (): AuthContext => {
  return authStore.state
}

const setAuthContext = (auth: AuthContext): AuthContext => {
  authStore.setState(() => auth)
  return authStore.state
}

export { authStore, getAuthContext, setAuthContext }
