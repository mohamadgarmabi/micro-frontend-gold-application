import { createFetch, type FetchClient } from 'tanstack-fetch'
import { clearAuthToken, getAuthToken } from '../auth/cookie'
import { getApiConfig, setApiConfig } from '../config'
import type { ApiConfig } from '../config'
import { createMockFetch } from './create-mock-fetch'

type ApiClient = Omit<FetchClient, 'sse'>

let client: ApiClient | null = null

const resolveBaseUrl = (options: ReturnType<typeof getApiConfig>) => {
  return options.baseURL
}

const resolveGetToken = (options: ReturnType<typeof getApiConfig>) => {
  if (options.getToken) {
    return options.getToken
  }

  if (options.auth?.tokenCookieName) {
    return () => getAuthToken()
  }

  return undefined
}

const createApiClient = (): ApiClient => {
  const options = getApiConfig()
  const fallbackFetch = options.fetch ?? globalThis.fetch.bind(globalThis)

  return createFetch({
    baseUrl: resolveBaseUrl(options),
    timeoutMs: options.timeout,
    headers: options.headers,
    plugins: options.plugins,
    credentials: options.credentials,
    maxRetries: options.maxRetries,
    interceptors: options.interceptors,
    onStatus: options.onStatus,
    throwOnError: options.throwOnError,
    source: options.source,
    incoming: options.incoming,
    getToken: resolveGetToken(options),
    onUnauthorized: (input) => {
      if (options.auth?.tokenCookieName) {
        clearAuthToken()
      }

      return options.onUnauthorized?.(input)
    },
    onForbidden: options.onForbidden,
    onNotFound: options.onNotFound,
    onServerError: options.onServerError,
    fetch: createMockFetch(options.mocks, fallbackFetch),
  })
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
