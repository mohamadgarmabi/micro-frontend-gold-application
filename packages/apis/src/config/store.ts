import type { ApiConfig, ResolvedApiConfig } from './types'

const DEFAULT_BASE_URL = 'https://jsonplaceholder.typicode.com'
const DEFAULT_TIMEOUT = 30_000

let config: ApiConfig = {}

export function setApiConfig(options: ApiConfig): ResolvedApiConfig {
  config = { ...config, ...options }
  return getApiConfig()
}

export function getApiConfig(): ResolvedApiConfig {
  return {
    baseURL: config.baseURL ?? DEFAULT_BASE_URL,
    timeout: config.timeout ?? DEFAULT_TIMEOUT,
    headers: config.headers,
    auth: config.auth,
    interceptors: config.interceptors,
  }
}

export function getAuthCookieName(): string | null {
  return config.auth?.tokenCookieName ?? null
}

export function isAuthConfigured(): boolean {
  return Boolean(config.auth?.tokenCookieName)
}

export function getApiBaseUrl(): string {
  return getApiConfig().baseURL
}
