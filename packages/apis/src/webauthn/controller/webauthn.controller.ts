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
  const { data } = await getApiClient().post<WebAuthnRegisterOptionsDto>(
    endpoint.webauthn.registerOptions,
  )

  return data
}

const requestRegisterVerify = async (credential: WebAuthnRegisterCredentialDto) => {
  const { data } = await getApiClient().post<WebAuthnRegisterResultDto>(
    endpoint.webauthn.registerVerify,
    credential,
  )

  return data
}

const requestAuthenticateOptions = async (input: WebAuthnAuthenticateOptionsRequestDto = {}) => {
  const { data } = await getApiClient().post<WebAuthnAuthenticateOptionsDto>(
    endpoint.webauthn.authenticateOptions,
    input,
  )

  return data
}

const requestAuthenticateVerify = async (credential: WebAuthnAuthenticateCredentialDto) => {
  const { data } = await getApiClient().post<WebAuthnSessionDto>(
    endpoint.webauthn.authenticateVerify,
    credential,
  )

  return data
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
