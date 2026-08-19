type WebAuthnBase64Url = string

type WebAuthnTransport = AuthenticatorTransport

type WebAuthnRpEntity = {
  name: string
  id?: string
}

type WebAuthnUserEntity = {
  id: WebAuthnBase64Url
  name: string
  displayName: string
}

type WebAuthnPubKeyCredParam = {
  type: 'public-key'
  alg: number
}

type WebAuthnAuthenticatorSelection = {
  authenticatorAttachment?: AuthenticatorAttachment
  residentKey?: ResidentKeyRequirement
  requireResidentKey?: boolean
  userVerification?: UserVerificationRequirement
}

type WebAuthnCredentialDescriptor = {
  id: WebAuthnBase64Url
  type: 'public-key'
  transports?: WebAuthnTransport[]
}

type WebAuthnRegisterOptionsDto = {
  challenge: WebAuthnBase64Url
  rp: WebAuthnRpEntity
  user: WebAuthnUserEntity
  pubKeyCredParams: WebAuthnPubKeyCredParam[]
  timeout?: number
  excludeCredentials?: WebAuthnCredentialDescriptor[]
  authenticatorSelection?: WebAuthnAuthenticatorSelection
  attestation?: AttestationConveyancePreference
}

type WebAuthnAttestationResponseDto = {
  clientDataJSON: WebAuthnBase64Url
  attestationObject: WebAuthnBase64Url
  transports?: WebAuthnTransport[]
}

type WebAuthnRegisterCredentialDto = {
  id: string
  rawId: WebAuthnBase64Url
  type: 'public-key'
  response: WebAuthnAttestationResponseDto
}

type WebAuthnRegisterResultDto = {
  credentialId: string
}

type WebAuthnAuthenticateOptionsRequestDto = {
  credentialId?: string
}

type WebAuthnAuthenticateOptionsDto = {
  challenge: WebAuthnBase64Url
  timeout?: number
  rpId?: string
  allowCredentials?: WebAuthnCredentialDescriptor[]
  userVerification?: UserVerificationRequirement
}

type WebAuthnAssertionResponseDto = {
  clientDataJSON: WebAuthnBase64Url
  authenticatorData: WebAuthnBase64Url
  signature: WebAuthnBase64Url
  userHandle?: WebAuthnBase64Url | null
}

type WebAuthnAuthenticateCredentialDto = {
  id: string
  rawId: WebAuthnBase64Url
  type: 'public-key'
  response: WebAuthnAssertionResponseDto
}

type WebAuthnSessionDto = {
  token: string
}

export type {
  WebAuthnAssertionResponseDto,
  WebAuthnAttestationResponseDto,
  WebAuthnAuthenticateCredentialDto,
  WebAuthnAuthenticateOptionsDto,
  WebAuthnAuthenticateOptionsRequestDto,
  WebAuthnAuthenticatorSelection,
  WebAuthnBase64Url,
  WebAuthnCredentialDescriptor,
  WebAuthnPubKeyCredParam,
  WebAuthnRegisterCredentialDto,
  WebAuthnRegisterOptionsDto,
  WebAuthnRegisterResultDto,
  WebAuthnRpEntity,
  WebAuthnSessionDto,
  WebAuthnTransport,
  WebAuthnUserEntity,
}
