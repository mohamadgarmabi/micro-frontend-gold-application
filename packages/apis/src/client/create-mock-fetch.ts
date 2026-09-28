import type { ApiMockConfig, ApiMockRoute } from "../config/mock"

const normalizePath = (value: string) => {
  try {
    return new URL(value, "http://local.invalid").pathname.replace(/\/+$/, "") || "/"
  } catch {
    return value
  }
}

const isAsyncIterable = (value: unknown): value is AsyncIterable<unknown> => {
  return Boolean(value && typeof value === "object" && Symbol.asyncIterator in value)
}

const encodeSseChunk = (payload: unknown, encoder: TextEncoder) => {
  return encoder.encode(`data: ${JSON.stringify(payload)}\n\n`)
}

const createSseResponse = (route: ApiMockRoute, signal?: AbortSignal) => {
  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    start: async (controller) => {
      let closed = false

      const close = () => {
        if (closed) {
          return
        }

        closed = true

        try {
          controller.close()
        } catch {
          // already closed
        }
      }

      const onAbort = () => {
        close()
      }

      signal?.addEventListener("abort", onAbort, { once: true })

      try {
        if (signal?.aborted) {
          close()
          return
        }

        const result = await route.handler()

        if (isAsyncIterable(result)) {
          for await (const chunk of result) {
            if (closed || signal?.aborted) {
              break
            }

            controller.enqueue(encodeSseChunk(chunk, encoder))
          }
        } else if (!closed && !signal?.aborted) {
          controller.enqueue(encodeSseChunk(result, encoder))
        }
      } catch (error) {
        if (!closed && !signal?.aborted) {
          controller.error(error)
          return
        }
      } finally {
        signal?.removeEventListener("abort", onAbort)
        close()
      }
    },
    cancel: () => {
      // consumer cancelled (client .close / abort)
    },
  })

  return new Response(stream, {
    status: 200,
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      connection: "keep-alive",
    },
  })
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
      const routeMethod = (route.method ?? "GET").toUpperCase()
      return routeMethod === method && routePath === path
    })

    if (!match) {
      return fallbackFetch(input, init)
    }

    if (match.sse) {
      return createSseResponse(match, request.signal)
    }

    const data = await match.handler()
    return Response.json(data, {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  }
}

export { createMockFetch }
