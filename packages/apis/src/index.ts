export {
  getApiBaseUrl,
  getApiConfig,
  getAuthCookieName,
  isAuthConfigured,
  setApiConfig,
} from './config'
export type { ApiAuthConfig, ApiConfig, ApiCookieOptions, ResolvedApiConfig } from './config'
export type { ApiMockConfig, ApiMockHandler, ApiMockMethod, ApiMockRoute } from './config'

export {
  clearAuthToken,
  getAuthToken,
  hasAuthToken,
  setAuthToken,
} from './auth'

export { configureApis, getApiClient } from './client'
export type { ApiClient } from './client'

export * from './posts'
export * from './market'
