import type { AuthConfig, CoreFetchOptions, StatusHandlers } from "tanstack-fetch"
import type { ApiAuthConfig } from "./auth"
import type { ApiMockConfig } from "./mock"

type ApiConfig = Pick<
  CoreFetchOptions,
  "headers" | "source" | "incoming" | "interceptors" | "fetch" | "credentials" | "maxRetries"
> & {
  /** Preferred app-facing alias for `baseUrl`. */
  baseURL?: string
  /** Native tanstack-fetch option (wins over `baseURL` when both are set). */
  baseUrl?: string
  timeout?: number
  timeoutMs?: number
  /** Cookie-based bearer auth used across Gold apps. */
  auth?: ApiAuthConfig
  /** Optional override for token resolution (wins over cookie auth). */
  getToken?: AuthConfig["getToken"]
  mocks?: ApiMockConfig
  /**
   * Mount the `tanstack-fetch/devtools` dock in the browser.
   * Defaults to `true` when `import.meta.env.DEV` is set.
   */
  enableDevtools?: boolean
  /** Per-status handlers, passed to `createStatusInterceptor` (`401`, `'4xx'`, `'5xx'`, `default`, …). */
  status?: StatusHandlers
}

type ResolvedApiConfig = Omit<ApiConfig, "baseURL" | "baseUrl" | "timeout" | "timeoutMs"> & {
  baseURL: string
  timeout: number
}

export type { ApiConfig, ResolvedApiConfig }
