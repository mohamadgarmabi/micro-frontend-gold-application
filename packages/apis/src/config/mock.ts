type ApiMockMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS"

type ApiMockHandler = () => unknown | Promise<unknown> | AsyncIterable<unknown>

type ApiMockRoute = {
  method?: ApiMockMethod
  path: string
  handler: ApiMockHandler
  /** Respond as `text/event-stream`. Handler may yield an async iterable of event payloads. */
  sse?: boolean
}

type ApiMockConfig = {
  enabled?: boolean
  routes: ApiMockRoute[]
}

export type { ApiMockConfig, ApiMockHandler, ApiMockMethod, ApiMockRoute }
