import type { ApiMockConfig } from '../config/mock'

const normalizePath = (value: string) => {
  try {
    return new URL(value, 'http://local.invalid').pathname.replace(/\/+$/, '') || '/'
  } catch {
    return value
  }
}

const createMockFetch = (
  mocks: ApiMockConfig | undefined,
  fallbackFetch: typeof fetch = globalThis.fetch.bind(globalThis),
): typeof fetch => {
  if (!mocks?.enabled) {
    return fallbackFetch
  }

  return async (input, init) => {
    const request = input instanceof Request ? input : new Request(String(input), init)
    const method = request.method.toUpperCase()
    const path = normalizePath(request.url)

    const match = mocks.routes.find((route) => {
      const routePath = normalizePath(route.path)
      const routeMethod = (route.method ?? 'GET').toUpperCase()
      return routeMethod === method && routePath === path
    })

    if (!match) {
      return fallbackFetch(input, init)
    }

    const data = await match.handler()
    return Response.json(data, {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }
}

export { createMockFetch }
