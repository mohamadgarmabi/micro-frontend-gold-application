import { createIsomorphicFn } from '@tanstack/react-start'
import { DEFAULT_TWO_FACTOR_ENABLED } from '#/config/security.constants'
import { securityStore } from '../stores/security.store'
import type { SecurityState } from '../types'

const defaultSecurityState: SecurityState = {
  pinHash: null,
  twoFactorEnabled: DEFAULT_TWO_FACTOR_ENABLED,
  pinUnlocked: true,
}

const getSecuritySession = createIsomorphicFn()
  .server(async () => defaultSecurityState)
  .client(async () => securityStore.actions.syncFromStorage())

export { getSecuritySession }
