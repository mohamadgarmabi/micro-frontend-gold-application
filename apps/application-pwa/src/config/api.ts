import type { ApiConfig } from '@gold/apis/config'

export const apiConfig = {
  baseURL:
    import.meta.env.VITE_APP_API_URL ??
    'https://jsonplaceholder.typicode.com',
  auth: {
    tokenCookieName: 'gold_auth_token',
    cookie: {
      path: '/',
      sameSite: 'lax',
      secure: import.meta.env.PROD,
      maxAge: 60 * 60 * 24 * 7,
    },
  },
} satisfies ApiConfig
