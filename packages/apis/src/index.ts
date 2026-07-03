export {
  getApiBaseUrl,
  getApiConfig,
  getAuthCookieName,
  isAuthConfigured,
  setApiConfig,
} from './config'
export type { ApiAuthConfig, ApiConfig, ApiCookieOptions, ResolvedApiConfig } from './config'
export type {
  ApiInterceptors,
  ApiRequestInterceptor,
  ApiResponseInterceptor,
} from './config'

export {
  clearAuthToken,
  createAuthInterceptors,
  getAuthToken,
  hasAuthToken,
  setAuthToken,
} from './auth'

export { configureApis, getApiClient } from './client'

export * from './posts'
