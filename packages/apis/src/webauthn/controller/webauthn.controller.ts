import { mutationOptions } from '@tanstack/react-query'
import { getApiClient } from '../../client'
import type {
  WebAuthnAuthenticateCredentialDto,
  WebAuthnAuthenticateOptionsDto,
  WebAuthnAuthenticateOptionsRequestDto,
  WebAuthnRegisterCredentialDto,
  WebAuthnRegisterOptionsDto,
  WebAuthnRegisterResultDto,
  WebAuthnSessionDto,
} from '../dto'
import { endpoint } from '../endpoints'

const requestRegisterOptions = async () => {
  return getApiClient().post<WebAuthnRegisterOptionsDto>(endpoint.webauthn.registerOptions)
}

const requestRegisterVerify = async (credential: WebAuthnRegisterCredentialDto) => {
  return getApiClient().post<WebAuthnRegisterResultDto>(endpoint.webauthn.registerVerify, {
    body: credential,
  })
}

const requestAuthenticateOptions = async (input: WebAuthnAuthenticateOptionsRequestDto = {}) => {
  return getApiClient().post<WebAuthnAuthenticateOptionsDto>(
    endpoint.webauthn.authenticateOptions,
    { body: input },
  )
}

const requestAuthenticateVerify = async (credential: WebAuthnAuthenticateCredentialDto) => {
  return getApiClient().post<WebAuthnSessionDto>(endpoint.webauthn.authenticateVerify, {
    body: credential,
  })
}

const requestRemoveCredentials = async () => {
  await getApiClient().delete(endpoint.webauthn.credentials)
}

const webauthnController = {
  getRegisterOptions: () =>
    mutationOptions({
      mutationKey: [endpoint.webauthn.registerOptions] as const,
      mutationFn: requestRegisterOptions,
    }),

  verifyRegister: () =>
    mutationOptions({
      mutationKey: [endpoint.webauthn.registerVerify] as const,
      mutationFn: requestRegisterVerify,
    }),

  getAuthenticateOptions: () =>
    mutationOptions({
      mutationKey: [endpoint.webauthn.authenticateOptions] as const,
      mutationFn: requestAuthenticateOptions,
    }),

  verifyAuthenticate: () =>
    mutationOptions({
      mutationKey: [endpoint.webauthn.authenticateVerify] as const,
      mutationFn: requestAuthenticateVerify,
    }),

  removeCredentials: () =>
    mutationOptions({
      mutationKey: [endpoint.webauthn.credentials, 'remove'] as const,
      mutationFn: requestRemoveCredentials,
    }),
}

export {
  requestAuthenticateOptions,
  requestAuthenticateVerify,
  requestRegisterOptions,
  requestRegisterVerify,
  requestRemoveCredentials,
  webauthnController,
}
