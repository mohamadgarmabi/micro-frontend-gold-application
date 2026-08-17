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

export type {
  AuthContext,
  AuthCredentials,
  AuthSearchParams,
  StoredWebAuthnCredential,
  WebAuthnErrorCode,
}
