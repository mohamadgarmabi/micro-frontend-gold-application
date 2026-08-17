import type { ApiConfig } from '@gold/apis/config'
import { AUTH_TOKEN_COOKIE_NAME } from '#/config/auth.constants'
import { authStore } from '#/modules/auth/stores/auth.store'

export const apiConfig = {
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
  interceptors: {
    response: [
      {
        onRejected: (error) => {
          if (error.response?.status === 401) {
            authStore.actions.clearSession()
          }

          return Promise.reject(error)
        },
      },
    ],
  },
} satisfies ApiConfig
