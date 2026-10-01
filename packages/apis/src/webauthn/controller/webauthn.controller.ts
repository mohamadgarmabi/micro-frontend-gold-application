import { mutationOptions } from "@tanstack/react-query"
import type { NoParams } from "tanstack-fetch"
import { getApiClient } from "../../client"
import type {
  WebAuthnAuthenticateCredentialRequestDto,
  WebAuthnAuthenticateOptionsRequestDto,
  WebAuthnAuthenticateOptionsResponseDto,
  WebAuthnRegisterCredentialRequestDto,
  WebAuthnRegisterOptionsResponseDto,
  WebAuthnRegisterResultResponseDto,
  WebAuthnSessionResponseDto,
} from "../dto"
import { endpoint } from "../endpoints"

const requestRegisterOptions = async () => {
  return getApiClient().post<WebAuthnRegisterOptionsResponseDto>(
    endpoint.webauthn.registerOptions,
    {},
  )
}

const requestRegisterVerify = async (body: WebAuthnRegisterCredentialRequestDto) => {
  return getApiClient().post<
    WebAuthnRegisterResultResponseDto,
    NoParams,
    WebAuthnRegisterCredentialRequestDto
  >(endpoint.webauthn.registerVerify, {
    body,
  })
}

const requestAuthenticateOptions = async (body: WebAuthnAuthenticateOptionsRequestDto = {}) => {
  return getApiClient().post<
    WebAuthnAuthenticateOptionsResponseDto,
    NoParams,
    WebAuthnAuthenticateOptionsRequestDto
  >(endpoint.webauthn.authenticateOptions, { body })
}

const requestAuthenticateVerify = async (body: WebAuthnAuthenticateCredentialRequestDto) => {
  return getApiClient().post<
    WebAuthnSessionResponseDto,
    NoParams,
    WebAuthnAuthenticateCredentialRequestDto
  >(endpoint.webauthn.authenticateVerify, {
    body,
  })
}

const requestRemoveCredentials = async () => {
  await getApiClient().delete(endpoint.webauthn.credentials, {})
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
      mutationKey: [endpoint.webauthn.credentials, "remove"] as const,
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
