import {
  getMarketOverviewMock,
  marketEndpoint,
  type ApiConfig,
} from '@gold/apis'
import { AUTH_TOKEN_COOKIE_NAME } from '#/config/auth.constants'
import { authStore } from '#/modules/auth/stores/auth.store'

const apiConfig = {
  baseURL: import.meta.env.VITE_APP_API_URL ?? 'https://jsonplaceholder.typicode.com',
  auth: {
    tokenCookieName: AUTH_TOKEN_COOKIE_NAME,
    cookie: {
      path: '/',
      sameSite: 'lax',
      secure: import.meta.env.PROD,
      maxAge: 60 * 60 * 24 * 7,
    },
  },
  mocks: {
    enabled: import.meta.env.VITE_USE_API_MOCK !== 'false',
    routes: [
      {
        method: 'GET',
        path: marketEndpoint.overview,
        handler: getMarketOverviewMock,
      }
    ],
  },
  onUnauthorized: () => {
    authStore.actions.clearSession()

    if (typeof window === 'undefined') {
      return
    }

    const redirect = `${window.location.pathname}${window.location.search}` || '/home'
    void import('#/router').then(({ getRouter }) => {
      getRouter().navigate({
        to: '/login',
        search: { redirect },
        replace: true,
      })
    })
  },
  onServerError: ({ status, error }) => {
    console.error('API server error', status, error.message)
  },
  onNotFound: ({ status, error }) => {
    console.error('API not found', status, error.message)
  },
} satisfies ApiConfig

export { apiConfig }
