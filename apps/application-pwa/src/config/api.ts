import {
  getMarketOverviewMock,
  marketEndpoint,
  parseRetryAfter,
  streamMarketTicksMock,
  type ApiConfig,
} from "@gold/apis"
import { AUTH_TOKEN_COOKIE_NAME } from "#/config/auth.constants"
import { authStore } from "#/modules/auth/stores/auth.store"

const apiConfig = {
  baseURL: import.meta.env.VITE_APP_API_URL ?? "https://jsonplaceholder.typicode.com",
  enableDevtools: import.meta.env.DEV,
  plugins: import.meta.env.DEV
    ? ["trace", "sse-resume", "retry-idempotent"]
    : ["sse-resume", "retry-idempotent"],
  maxRetries: 2,
  auth: {
    tokenCookieName: AUTH_TOKEN_COOKIE_NAME,
    cookie: {
      path: "/",
      sameSite: "lax",
      secure: import.meta.env.PROD,
      maxAge: 60 * 60 * 24 * 7,
    },
  },
  mocks: {
    enabled: import.meta.env.VITE_USE_API_MOCK !== "false",
    routes: [
      {
        method: "GET",
        path: marketEndpoint.overview,
        handler: getMarketOverviewMock,
      },
      {
        method: "GET",
        path: marketEndpoint.ticks,
        sse: true,
        handler: streamMarketTicksMock,
      },
    ],
  },
  onUnauthorized: () => {
    authStore.actions.clearSession()

    if (typeof window === "undefined") {
      return
    }

    const redirect = `${window.location.pathname}${window.location.search}` || "/home"
    void import("#/router").then(({ getRouter }) => {
      getRouter().navigate({
        to: "/login",
        search: { redirect },
        replace: true,
      })
    })
  },
  onTooManyRequests: async ({ context }) => {
    const delayMs = parseRetryAfter(context.response?.headers, 1_000) ?? 1_000
    return { action: "retry", delayMs }
  },
  onServerError: ({ status, error }) => {
    console.error("API server error", status, error.message)
  },
  onNotFound: ({ status, error }) => {
    console.error("API not found", status, error.message)
  },
  onClientError: ({ status, error }) => {
    console.warn("API client error", status, error.message)
  },
} satisfies ApiConfig

export { apiConfig }
