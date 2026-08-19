import type {
  WebAuthnAuthenticateCredentialDto,
  WebAuthnAuthenticateOptionsDto,
  WebAuthnCredentialDescriptor,
  WebAuthnRegisterCredentialDto,
  WebAuthnRegisterOptionsDto,
} from '@gold/apis/webauthn'

const bufferToBase64Url = (buffer: ArrayBuffer) => {
  const base64 = btoa(
    Array.from(new Uint8Array(buffer), (byte) => String.fromCharCode(byte)).join(''),
  )

  return base64.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
}

const base64UrlToBuffer = (value: string) => {
  const padded = value.replaceAll('-', '+').replaceAll('_', '/')
  const padLength = (4 - (padded.length % 4)) % 4
  const base64 = `${padded}${'='.repeat(padLength)}`

  return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0))
}

const toCredentialDescriptors = (credentials: WebAuthnCredentialDescriptor[] | undefined) =>
  credentials?.map((credential) => ({
    id: base64UrlToBuffer(credential.id),
    type: credential.type,
    transports: credential.transports,
  }))

const toCreationOptions = (
  options: WebAuthnRegisterOptionsDto,
): PublicKeyCredentialCreationOptions => ({
  challenge: base64UrlToBuffer(options.challenge),
  rp: {
    name: options.rp.name,
    id: options.rp.id,
  },
  user: {
    id: base64UrlToBuffer(options.user.id),
    name: options.user.name,
    displayName: options.user.displayName,
  },
  pubKeyCredParams: options.pubKeyCredParams,
  timeout: options.timeout,
  excludeCredentials: toCredentialDescriptors(options.excludeCredentials),
  authenticatorSelection: options.authenticatorSelection,
  attestation: options.attestation,
})

const toRequestOptions = (
  options: WebAuthnAuthenticateOptionsDto,
  fallbackCredentialId?: string,
): PublicKeyCredentialRequestOptions => {
  const allowCredentials =
    options.allowCredentials && options.allowCredentials.length > 0
      ? options.allowCredentials
      : fallbackCredentialId
        ? [{ id: fallbackCredentialId, type: 'public-key' as const }]
        : undefined

  return {
    challenge: base64UrlToBuffer(options.challenge),
    timeout: options.timeout,
    rpId: options.rpId,
    allowCredentials: toCredentialDescriptors(allowCredentials),
    userVerification: options.userVerification,
  }
}

const isAuthenticatorTransport = (value: string): value is AuthenticatorTransport => {
  switch (value) {
    case 'ble':
    case 'hybrid':
    case 'internal':
    case 'nfc':
    case 'usb':
      return true
    default:
      return false
  }
}

const serializeAttestation = (credential: PublicKeyCredential): WebAuthnRegisterCredentialDto => {
  const { response } = credential
  if (!(response instanceof AuthenticatorAttestationResponse)) {
    throw new TypeError('Invalid attestation response')
  }

  const transports =
    typeof response.getTransports === 'function'
      ? response.getTransports().filter(isAuthenticatorTransport)
      : undefined

  return {
    id: credential.id,
    rawId: bufferToBase64Url(credential.rawId),
    type: 'public-key',
    response: {
      clientDataJSON: bufferToBase64Url(response.clientDataJSON),
      attestationObject: bufferToBase64Url(response.attestationObject),
      transports,
    },
  }
}

const serializeAssertion = (credential: PublicKeyCredential): WebAuthnAuthenticateCredentialDto => {
  const { response } = credential
  if (!(response instanceof AuthenticatorAssertionResponse)) {
    throw new TypeError('Invalid assertion response')
  }

  const userHandle = response.userHandle ? bufferToBase64Url(response.userHandle) : null

  return {
    id: credential.id,
    rawId: bufferToBase64Url(credential.rawId),
    type: 'public-key',
    response: {
      clientDataJSON: bufferToBase64Url(response.clientDataJSON),
      authenticatorData: bufferToBase64Url(response.authenticatorData),
      signature: bufferToBase64Url(response.signature),
      userHandle,
    },
  }
}

export { serializeAssertion, serializeAttestation, toCreationOptions, toRequestOptions }
