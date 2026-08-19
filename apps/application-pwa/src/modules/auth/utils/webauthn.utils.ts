import { WEBAUTHN_STORAGE_KEY } from '#/config/auth.constants'
import {
  requestAuthenticateOptions,
  requestAuthenticateVerify,
  requestRegisterOptions,
  requestRegisterVerify,
  requestRemoveCredentials,
} from '../apis/webauthn'
import type { StoredWebAuthnCredential, WebAuthnErrorCode } from '../types'
import {
  serializeAssertion,
  serializeAttestation,
  toCreationOptions,
  toRequestOptions,
} from './webauthn.codec'

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

const registerWebAuthnCredential = async () => {
  const options = await requestRegisterOptions()
  const credential = assertPublicKeyCredential(
    await navigator.credentials.create({ publicKey: toCreationOptions(options) }),
  )
  const result = await requestRegisterVerify(serializeAttestation(credential))
  const stored = { credentialId: result.credentialId }

  persistWebAuthnCredential(stored)
  return stored
}

const authenticateWithWebAuthn = async () => {
  const stored = readWebAuthnCredential()
  if (!stored) {
    throw new Error('No biometric credential is registered')
  }

  const options = await requestAuthenticateOptions({ credentialId: stored.credentialId })
  const assertion = assertPublicKeyCredential(
    await navigator.credentials.get({
      publicKey: toRequestOptions(options, stored.credentialId),
    }),
  )

  return requestAuthenticateVerify(serializeAssertion(assertion))
}

const removeWebAuthnCredential = async () => {
  await requestRemoveCredentials()
  clearWebAuthnCredential()
}

export {
  authenticateWithWebAuthn,
  clearWebAuthnCredential,
  getWebAuthnErrorCode,
  isWebAuthnSupported,
  readWebAuthnCredential,
  registerWebAuthnCredential,
  removeWebAuthnCredential,
}
