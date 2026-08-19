import { createStore } from '@tanstack/store'
import { DEFAULT_TWO_FACTOR_ENABLED } from '#/config/security.constants'
import type { SecurityState } from '../types'
import {
  persistPinHash,
  persistPinUnlocked,
  persistTwoFactorEnabled,
  readSecurityState,
} from '../utils/security.utils'

const defaultSecurityState: SecurityState = {
  pinHash: null,
  twoFactorEnabled: DEFAULT_TWO_FACTOR_ENABLED,
  pinUnlocked: true,
}

const securityStore = createStore(defaultSecurityState, ({ setState, get }) => ({
  hydrate: (nextState: SecurityState): SecurityState => {
    setState(() => nextState)
    return get()
  },
  syncFromStorage: (): SecurityState => {
    const nextState = readSecurityState()
    setState(() => nextState)
    return get()
  },
  setPinHash: (pinHash: string): SecurityState => {
    persistPinHash(pinHash)
    persistPinUnlocked(true)
    setState((current) => ({
      ...current,
      pinHash,
      pinUnlocked: true,
    }))
    return get()
  },
  setTwoFactorEnabled: (twoFactorEnabled: boolean): SecurityState => {
    persistTwoFactorEnabled(twoFactorEnabled)
    setState((current) => ({
      ...current,
      twoFactorEnabled,
    }))
    return get()
  },
  lock: (): SecurityState => {
    persistPinUnlocked(false)
    setState((current) => ({
      ...current,
      pinUnlocked: false,
    }))
    return get()
  },
  unlock: (): SecurityState => {
    persistPinUnlocked(true)
    setState((current) => ({
      ...current,
      pinUnlocked: true,
    }))
    return get()
  },
}))

const getSecurityState = (): SecurityState => {
  return securityStore.state
}

export { getSecurityState, securityStore }
