import type { CreateFetchOptions, StatusHandler } from 'tanstack-fetch'
import type { ApiAuthConfig } from './auth'
import type { ApiMockConfig } from './mock'

type ApiConfig = Omit<CreateFetchOptions, 'baseUrl' | 'timeoutMs' | 'getToken' | 'auth'> & {
  /** Preferred app-facing alias for `baseUrl`. */
  baseURL?: string
  /** Native tanstack-fetch option (wins over `baseURL` when both are set). */
  baseUrl?: string
  timeout?: number
  timeoutMs?: number
  /** Cookie-based bearer auth used across Gold apps. */
  auth?: ApiAuthConfig
  /** Optional override for token resolution (wins over cookie auth). */
  getToken?: CreateFetchOptions['getToken']
  mocks?: ApiMockConfig
  onUnauthorized?: StatusHandler
  onForbidden?: StatusHandler
  onNotFound?: StatusHandler
  onServerError?: StatusHandler
}

type ResolvedApiConfig = {
  baseURL: string
  timeout: number
  headers?: CreateFetchOptions['headers']
  auth?: ApiAuthConfig
  getToken?: CreateFetchOptions['getToken']
  mocks?: ApiMockConfig
  onUnauthorized?: StatusHandler
  onForbidden?: StatusHandler
  onNotFound?: StatusHandler
  onServerError?: StatusHandler
  plugins?: CreateFetchOptions['plugins']
  credentials?: CreateFetchOptions['credentials']
  maxRetries?: CreateFetchOptions['maxRetries']
  fetch?: CreateFetchOptions['fetch']
  interceptors?: CreateFetchOptions['interceptors']
  onStatus?: CreateFetchOptions['onStatus']
  throwOnError?: CreateFetchOptions['throwOnError']
  source?: CreateFetchOptions['source']
  incoming?: CreateFetchOptions['incoming']
}

export type { ApiConfig, ResolvedApiConfig }
