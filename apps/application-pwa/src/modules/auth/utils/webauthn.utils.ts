import { WEBAUTHN_RP_NAME, WEBAUTHN_STORAGE_KEY } from '#/config/auth.constants'
import type { StoredWebAuthnCredential, WebAuthnErrorCode } from '../types'

const bufferToBase64 = (buffer: ArrayBuffer) =>
  btoa(Array.from(new Uint8Array(buffer), (byte) => String.fromCharCode(byte)).join(''))

const base64ToBuffer = (value: string) => Uint8Array.from(atob(value), (char) => char.charCodeAt(0))

const isStoredWebAuthnCredential = (value: unknown): value is StoredWebAuthnCredential => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'credentialId' in value &&
    typeof value.credentialId === 'string' &&
    value.credentialId.length > 0
  )
}

const isWebAuthnSupported = async () => {
  if (
    typeof window === 'undefined' ||
    typeof window.PublicKeyCredential !== 'function' ||
    typeof navigator.credentials?.create !== 'function' ||
    typeof navigator.credentials?.get !== 'function'
  ) {
    return false
  }

  if (typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable !== 'function') {
    return true
  }

  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  } catch {
    return false
  }
}

const readWebAuthnCredential = (): StoredWebAuthnCredential | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const stored = localStorage.getItem(WEBAUTHN_STORAGE_KEY)
  if (!stored) {
    return null
  }

  try {
    const parsed: unknown = JSON.parse(stored)
    return isStoredWebAuthnCredential(parsed) ? parsed : null
  } catch {
    return null
  }
}

const persistWebAuthnCredential = (credential: StoredWebAuthnCredential) =>
  localStorage.setItem(WEBAUTHN_STORAGE_KEY, JSON.stringify(credential))

const clearWebAuthnCredential = () => localStorage.removeItem(WEBAUTHN_STORAGE_KEY)

const getWebAuthnErrorCode = (error: unknown): WebAuthnErrorCode => {
  if (
    error instanceof DOMException &&
    (error.name === 'NotAllowedError' || error.name === 'AbortError')
  ) {
    return 'cancelled'
  }

  return 'failed'
}

const assertPublicKeyCredential = (credential: Credential | null) => {
  if (!(credential instanceof PublicKeyCredential)) {
    throw new DOMException('Biometric prompt was dismissed', 'NotAllowedError')
  }

  return credential
}

const createRandomBytes = (size: number) => crypto.getRandomValues(new Uint8Array(size))

const registerWebAuthnCredential = async () => {
  const credential = assertPublicKeyCredential(
    await navigator.credentials.create({
      publicKey: {
        challenge: createRandomBytes(32),
        rp: {
          name: WEBAUTHN_RP_NAME,
          id: window.location.hostname,
        },
        user: {
          id: createRandomBytes(16),
          name: 'aurum-user',
          displayName: WEBAUTHN_RP_NAME,
        },
        pubKeyCredParams: [
          { type: 'public-key', alg: -7 },
          { type: 'public-key', alg: -257 },
        ],
        authenticatorSelection: {
          userVerification: 'required',
          residentKey: 'preferred',
        },
        timeout: 60_000,
        attestation: 'none',
      },
    }),
  )

  const stored = { credentialId: bufferToBase64(credential.rawId) }
  persistWebAuthnCredential(stored)
  return stored
}

const authenticateWithWebAuthn = async () => {
  const stored = readWebAuthnCredential()
  if (!stored) {
    throw new Error('No biometric credential is registered')
  }

  assertPublicKeyCredential(
    await navigator.credentials.get({
      publicKey: {
        challenge: createRandomBytes(32),
        rpId: window.location.hostname,
        allowCredentials: [
          {
            id: base64ToBuffer(stored.credentialId),
            type: 'public-key',
          },
        ],
        userVerification: 'required',
        timeout: 60_000,
      },
    }),
  )
}

export {
  authenticateWithWebAuthn,
  clearWebAuthnCredential,
  getWebAuthnErrorCode,
  isWebAuthnSupported,
  readWebAuthnCredential,
  registerWebAuthnCredential,
}
