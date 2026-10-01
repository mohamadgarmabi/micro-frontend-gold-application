import { createFetch, type FetchClient } from "tanstack-fetch/sse"
import { clearAuthToken, getAuthToken } from "../auth/cookie"
import { getApiConfig, setApiConfig } from "../config"
import type { ApiConfig } from "../config"
import { createMockFetch } from "./create-mock-fetch"

type ApiClient = FetchClient

let client: ApiClient | null = null
let destroyDevtools: (() => void) | null = null

const resolveGetToken = (options: ReturnType<typeof getApiConfig>) => {
  if (options.getToken) {
    return options.getToken
  }

  if (options.auth?.tokenCookieName) {
    return () => getAuthToken()
  }

  return undefined
}

const shouldEnableDevtools = (enabled: boolean | undefined) => {
  if (enabled !== true) {
    return false
  }

  return typeof window !== "undefined"
}

const attachDevtools = (api: ApiClient, enabled: boolean | undefined) => {
  destroyDevtools?.()
  destroyDevtools = null

  if (!shouldEnableDevtools(enabled)) {
    return
  }

  void import("tanstack-fetch/devtools").then(({ setupDevtools }) => {
    const panel = setupDevtools(api, {
      http: true,
      sse: true,
      ssr: true,
      open: false,
    })
    destroyDevtools = panel.destroy
  })
}

const createApiClient = (): ApiClient => {
  const options = getApiConfig()
  const fallbackFetch = options.fetch ?? globalThis.fetch.bind(globalThis)

  const nextClient = createFetch({
    baseUrl: options.baseURL,
    timeoutMs: options.timeout,
    headers: options.headers,
    plugins: options.plugins,
    credentials: options.credentials,
    maxRetries: options.maxRetries,
    interceptors: options.interceptors,
    onStatus: options.onStatus,
    source: options.source,
    incoming: options.incoming,
    getToken: resolveGetToken(options),
    onBadRequest: options.onBadRequest,
    onUnauthorized: (input) => {
      if (options.auth?.tokenCookieName) {
        clearAuthToken()
      }

      return options.onUnauthorized?.(input)
    },
    onForbidden: options.onForbidden,
    onNotFound: options.onNotFound,
    onMethodNotAllowed: options.onMethodNotAllowed,
    onRequestTimeout: options.onRequestTimeout,
    onConflict: options.onConflict,
    onGone: options.onGone,
    onPayloadTooLarge: options.onPayloadTooLarge,
    onUnsupportedMediaType: options.onUnsupportedMediaType,
    onUnprocessableEntity: options.onUnprocessableEntity,
    onTooManyRequests: options.onTooManyRequests,
    onUnavailableForLegalReasons: options.onUnavailableForLegalReasons,
    onClientError: options.onClientError,
    onServerError: options.onServerError,
    fetch: createMockFetch(options.mocks, fallbackFetch),
  })

  attachDevtools(nextClient, options.enableDevtools)

  return nextClient
}

const configureApis = (options: ApiConfig): ApiClient => {
  setApiConfig(options)
  client = createApiClient()
  return client
}

const getApiClient = (): ApiClient => {
  if (!client) {
    client = createApiClient()
  }

  return client
}

export { configureApis, getApiClient }
export type { ApiClient }
