type ApiMockMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'

type ApiMockHandler = () => unknown | Promise<unknown>

type ApiMockRoute = {
  method?: ApiMockMethod
  path: string
  handler: ApiMockHandler
}

type ApiMockConfig = {
  enabled?: boolean
  routes: ApiMockRoute[]
}

export type { ApiMockConfig, ApiMockHandler, ApiMockMethod, ApiMockRoute }
