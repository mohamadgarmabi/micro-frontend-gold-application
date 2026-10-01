import type { CreateFetchOptions, StatusHandler } from "tanstack-fetch"
import type { ApiAuthConfig } from "./auth"
import type { ApiMockConfig } from "./mock"

type ApiConfig = Omit<CreateFetchOptions, "baseUrl" | "timeoutMs" | "getToken" | "auth"> & {
  /** Preferred app-facing alias for `baseUrl`. */
  baseURL?: string
  /** Native tanstack-fetch option (wins over `baseURL` when both are set). */
  baseUrl?: string
  timeout?: number
  timeoutMs?: number
  /** Cookie-based bearer auth used across Gold apps. */
  auth?: ApiAuthConfig
  /** Optional override for token resolution (wins over cookie auth). */
  getToken?: CreateFetchOptions["getToken"]
  mocks?: ApiMockConfig
  /**
   * Mount the `tanstack-fetch/devtools` dock in the browser.
   * Defaults to `true` when `import.meta.env.DEV` is set.
   */
  enableDevtools?: boolean
  onUnauthorized?: StatusHandler
  onForbidden?: StatusHandler
  onNotFound?: StatusHandler
  onServerError?: StatusHandler
}

type ResolvedApiConfig = {
  baseURL: string
  timeout: number
  headers?: CreateFetchOptions["headers"]
  auth?: ApiAuthConfig
  getToken?: CreateFetchOptions["getToken"]
  mocks?: ApiMockConfig
  enableDevtools?: boolean
  plugins?: CreateFetchOptions["plugins"]
  credentials?: CreateFetchOptions["credentials"]
  maxRetries?: CreateFetchOptions["maxRetries"]
  fetch?: CreateFetchOptions["fetch"]
  interceptors?: CreateFetchOptions["interceptors"]
  onStatus?: CreateFetchOptions["onStatus"]
  source?: CreateFetchOptions["source"]
  incoming?: CreateFetchOptions["incoming"]
  onBadRequest?: StatusHandler
  onUnauthorized?: StatusHandler
  onForbidden?: StatusHandler
  onNotFound?: StatusHandler
  onMethodNotAllowed?: StatusHandler
  onRequestTimeout?: StatusHandler
  onConflict?: StatusHandler
  onGone?: StatusHandler
  onPayloadTooLarge?: StatusHandler
  onUnsupportedMediaType?: StatusHandler
  onUnprocessableEntity?: StatusHandler
  onTooManyRequests?: StatusHandler
  onUnavailableForLegalReasons?: StatusHandler
  onClientError?: StatusHandler
  onServerError?: StatusHandler
}

export type { ApiConfig, ResolvedApiConfig }
