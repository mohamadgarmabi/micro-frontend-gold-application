import { isAbortError, isFetchError, parseRetryAfter } from "tanstack-fetch"
import {
  createRefreshTokenInterceptor,
  createSseResumeInterceptor,
  type RefreshTokenConfig,
} from "tanstack-fetch/plugins"

export {
  createRefreshTokenInterceptor,
  createSseResumeInterceptor,
  isAbortError,
  isFetchError,
  parseRetryAfter,
}
export type { RefreshTokenConfig }
