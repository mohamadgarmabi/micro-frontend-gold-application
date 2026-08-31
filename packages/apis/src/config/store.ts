import type { ApiConfig, ResolvedApiConfig } from './types'

const DEFAULT_BASE_URL = 'https://jsonplaceholder.typicode.com'
const DEFAULT_TIMEOUT = 30_000

let config: ApiConfig = {}

const setApiConfig = (options: ApiConfig): ResolvedApiConfig => {
  config = { ...config, ...options }
  return getApiConfig()
}

const getApiConfig = (): ResolvedApiConfig => {
  return {
    baseURL: config.baseURL ?? DEFAULT_BASE_URL,
    timeout: config.timeout ?? DEFAULT_TIMEOUT,
    headers: config.headers,
    auth: config.auth,
    interceptors: config.interceptors,
  }
}

const getAuthCookieName = (): string | null => {
  return config.auth?.tokenCookieName ?? null
}

const isAuthConfigured = (): boolean => {
  return Boolean(config.auth?.tokenCookieName)
}

const getApiBaseUrl = (): string => {
  return getApiConfig().baseURL
}

export { setApiConfig, getApiConfig, getAuthCookieName, isAuthConfigured, getApiBaseUrl }
