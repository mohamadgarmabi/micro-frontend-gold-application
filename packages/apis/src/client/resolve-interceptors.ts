import type { ApiAuthConfig, ApiInterceptors } from '../config'
import { createAuthInterceptors } from '../auth'

const resolveApiInterceptors = (
  auth?: ApiAuthConfig,
  custom?: ApiInterceptors,
): ApiInterceptors | undefined => {
  const authInterceptors = auth?.tokenCookieName
    ? createAuthInterceptors()
    : undefined

  if (!authInterceptors && !custom) {
    return undefined
  }

  return {
    request: [
      ...(authInterceptors?.request ?? []),
      ...(custom?.request ?? []),
    ],
    response: [
      ...(authInterceptors?.response ?? []),
      ...(custom?.response ?? []),
    ],
  }
}

export { resolveApiInterceptors }
