type AuthCredentials = {
  phone: string
  countryCode: string
}

type AuthContext = {
  token: string | null
  isAuthenticated: boolean
}

type AuthSearchParams = {
  redirect: string
}

type StoredWebAuthnCredential = {
  credentialId: string
}

type WebAuthnErrorCode = 'cancelled' | 'failed'

type PinStep = 'current' | 'create' | 'confirm'

type SecurityState = {
  pinHash: string | null
  twoFactorEnabled: boolean
  pinUnlocked: boolean
}

export type {
  AuthContext,
  AuthCredentials,
  AuthSearchParams,
  PinStep,
  SecurityState,
  StoredWebAuthnCredential,
  WebAuthnErrorCode,
}
