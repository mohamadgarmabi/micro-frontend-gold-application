import {
  DEFAULT_TWO_FACTOR_ENABLED,
  PIN_HASH_STORAGE_KEY,
  PIN_UNLOCK_STORAGE_KEY,
  TWO_FACTOR_STORAGE_KEY,
} from '#/config/security.constants'
import type { SecurityState } from '../types'

const isBrowser = () => typeof window !== 'undefined'

const toHex = (buffer: ArrayBuffer) => {
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

const hashPin = async (pin: string) => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pin))
  return toHex(digest)
}

const verifyPinHash = async (pin: string, pinHash: string) => {
  const nextHash = await hashPin(pin)
  return nextHash === pinHash
}

const readPinHash = () => {
  if (!isBrowser()) {
    return null
  }

  return window.localStorage.getItem(PIN_HASH_STORAGE_KEY)
}

const persistPinHash = (pinHash: string) => {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(PIN_HASH_STORAGE_KEY, pinHash)
}

const readTwoFactorEnabled = () => {
  if (!isBrowser()) {
    return DEFAULT_TWO_FACTOR_ENABLED
  }

  const stored = window.localStorage.getItem(TWO_FACTOR_STORAGE_KEY)

  if (stored === 'true') {
    return true
  }

  if (stored === 'false') {
    return false
  }

  return DEFAULT_TWO_FACTOR_ENABLED
}

const persistTwoFactorEnabled = (enabled: boolean) => {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(TWO_FACTOR_STORAGE_KEY, String(enabled))
}

const readPinUnlocked = (hasPin: boolean) => {
  if (!hasPin) {
    return true
  }

  if (!isBrowser()) {
    return true
  }

  return window.sessionStorage.getItem(PIN_UNLOCK_STORAGE_KEY) === '1'
}

const persistPinUnlocked = (unlocked: boolean) => {
  if (!isBrowser()) {
    return
  }

  if (unlocked) {
    window.sessionStorage.setItem(PIN_UNLOCK_STORAGE_KEY, '1')
    return
  }

  window.sessionStorage.removeItem(PIN_UNLOCK_STORAGE_KEY)
}

const readSecurityState = (): SecurityState => {
  const pinHash = readPinHash()

  return {
    pinHash,
    twoFactorEnabled: readTwoFactorEnabled(),
    pinUnlocked: readPinUnlocked(Boolean(pinHash)),
  }
}

const needsPinUnlock = (security: SecurityState) => {
  return Boolean(security.pinHash) && !security.pinUnlocked
}

export {
  hashPin,
  needsPinUnlock,
  persistPinHash,
  persistPinUnlocked,
  persistTwoFactorEnabled,
  readSecurityState,
  verifyPinHash,
}
