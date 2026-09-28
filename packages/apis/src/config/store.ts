import type { ApiConfig, ResolvedApiConfig } from "./types"

const DEFAULT_BASE_URL = "https://jsonplaceholder.typicode.com"
const DEFAULT_TIMEOUT = 30_000

let config: ApiConfig = {}

const setApiConfig = (options: ApiConfig): ResolvedApiConfig => {
  config = { ...config, ...options }
  return getApiConfig()
}

const getApiConfig = (): ResolvedApiConfig => {
  return {
    baseURL: config.baseUrl ?? config.baseURL ?? DEFAULT_BASE_URL,
    timeout: config.timeoutMs ?? config.timeout ?? DEFAULT_TIMEOUT,
    headers: config.headers,
    auth: config.auth,
    getToken: config.getToken,
    mocks: config.mocks,
    enableDevtools: config.enableDevtools,
    plugins: config.plugins,
    credentials: config.credentials,
    maxRetries: config.maxRetries,
    fetch: config.fetch,
    interceptors: config.interceptors,
    onStatus: config.onStatus,
    throwOnError: config.throwOnError,
    source: config.source,
    incoming: config.incoming,
    onBadRequest: config.onBadRequest,
    onUnauthorized: config.onUnauthorized,
    onForbidden: config.onForbidden,
    onNotFound: config.onNotFound,
    onMethodNotAllowed: config.onMethodNotAllowed,
    onRequestTimeout: config.onRequestTimeout,
    onConflict: config.onConflict,
    onGone: config.onGone,
    onPayloadTooLarge: config.onPayloadTooLarge,
    onUnsupportedMediaType: config.onUnsupportedMediaType,
    onUnprocessableEntity: config.onUnprocessableEntity,
    onTooManyRequests: config.onTooManyRequests,
    onUnavailableForLegalReasons: config.onUnavailableForLegalReasons,
    onClientError: config.onClientError,
    onServerError: config.onServerError,
  }
}

const getAuthCookieName = (): string | null => {
  return config.auth?.tokenCookieName ?? null
}

const isAuthConfigured = (): boolean => {
  return Boolean(config.auth?.tokenCookieName || config.getToken)
}

const getApiBaseUrl = (): string => {
  return getApiConfig().baseURL
}

export { getApiBaseUrl, getApiConfig, getAuthCookieName, isAuthConfigured, setApiConfig }
