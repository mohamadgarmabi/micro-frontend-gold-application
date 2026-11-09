import type { ApiConfig, ResolvedApiConfig } from "./types"

const DEFAULT_BASE_URL = "https://jsonplaceholder.typicode.com"
const DEFAULT_TIMEOUT = 30_000

let config: ApiConfig = {}

const setApiConfig = (options: ApiConfig): ResolvedApiConfig => {
  config = { ...config, ...options }
  return getApiConfig()
}

const getApiConfig = (): ResolvedApiConfig => {
  const { baseURL, baseUrl, timeout, timeoutMs, ...rest } = config

  return {
    ...rest,
    baseURL: baseUrl ?? baseURL ?? DEFAULT_BASE_URL,
    timeout: timeoutMs ?? timeout ?? DEFAULT_TIMEOUT,
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
