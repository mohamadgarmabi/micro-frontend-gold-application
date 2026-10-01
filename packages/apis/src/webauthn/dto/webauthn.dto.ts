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
  type: "public-key"
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
  type: "public-key"
  transports?: WebAuthnTransport[]
}

type WebAuthnRegisterOptionsResponseDto = {
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

type WebAuthnRegisterCredentialRequestDto = {
  id: string
  rawId: WebAuthnBase64Url
  type: "public-key"
  response: WebAuthnAttestationResponseDto
}

type WebAuthnRegisterResultResponseDto = {
  credentialId: string
}

type WebAuthnAuthenticateOptionsRequestDto = {
  credentialId?: string
}

type WebAuthnAuthenticateOptionsResponseDto = {
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

type WebAuthnAuthenticateCredentialRequestDto = {
  id: string
  rawId: WebAuthnBase64Url
  type: "public-key"
  response: WebAuthnAssertionResponseDto
}

type WebAuthnSessionResponseDto = {
  token: string
}

export type {
  WebAuthnAssertionResponseDto,
  WebAuthnAttestationResponseDto,
  WebAuthnAuthenticateCredentialRequestDto,
  WebAuthnAuthenticateOptionsRequestDto,
  WebAuthnAuthenticateOptionsResponseDto,
  WebAuthnAuthenticatorSelection,
  WebAuthnBase64Url,
  WebAuthnCredentialDescriptor,
  WebAuthnPubKeyCredParam,
  WebAuthnRegisterCredentialRequestDto,
  WebAuthnRegisterOptionsResponseDto,
  WebAuthnRegisterResultResponseDto,
  WebAuthnRpEntity,
  WebAuthnSessionResponseDto,
  WebAuthnTransport,
  WebAuthnUserEntity,
}
