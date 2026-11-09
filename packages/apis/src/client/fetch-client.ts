import { createMocks } from "tanstack-fetch/mock"
import type { StatusHandler } from "tanstack-fetch"
import { createAuthInterceptor, createStatusInterceptor } from "tanstack-fetch/plugins"
import { createFetch, type FetchClient } from "tanstack-fetch/sse"
import { clearAuthToken, getAuthToken } from "../auth/cookie"
import { getApiConfig, setApiConfig } from "../config"
import type { ApiConfig, ResolvedApiConfig } from "../config"

type ApiClient = FetchClient

let client: ApiClient | null = null
let destroyDevtools: (() => void) | null = null

const resolveGetToken = (options: ResolvedApiConfig) => {
  if (options.getToken) {
    return options.getToken
  }

  if (options.auth?.tokenCookieName) {
    return () => getAuthToken()
  }

  return undefined
}

const resolveStatusHandlers = (options: ResolvedApiConfig) => {
  if (!options.auth?.tokenCookieName) {
    return options.status
  }

  const onUnauthorized = options.status?.[401]

  const clearTokenOnUnauthorized: StatusHandler = (input) => {
    clearAuthToken()
    return onUnauthorized?.(input)
  }

  return { ...options.status, 401: clearTokenOnUnauthorized }
}

const resolveInterceptors = (options: ResolvedApiConfig) => {
  const getToken = resolveGetToken(options)
  const status = resolveStatusHandlers(options)

  return [
    ...(getToken ? [createAuthInterceptor({ getToken })] : []),
    ...(status ? [createStatusInterceptor(status)] : []),
    ...(options.interceptors ?? []),
  ]
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
  const nextClient = createFetch({
    baseUrl: options.baseURL,
    timeoutMs: options.timeout,
    headers: options.headers,
    credentials: options.credentials,
    maxRetries: options.maxRetries,
    interceptors: resolveInterceptors(options),
    source: options.source,
    incoming: options.incoming,
    fetch: options.fetch,
    mocks: options.mocks && createMocks(options.mocks),
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
