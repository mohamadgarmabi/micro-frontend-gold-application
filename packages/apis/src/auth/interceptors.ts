import type { ApiInterceptors } from '../config'
import { clearAuthToken, getAuthToken } from './cookie'

export function createAuthInterceptors(): ApiInterceptors {
  return {
    request: [
      {
        onFulfilled: (config) => {
          const token = getAuthToken()

          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }

          return config
        },
      },
    ],
    response: [
      {
        onRejected: (error) => {
          if (error.response?.status === 401) {
            clearAuthToken()
          }

          return Promise.reject(error)
        },
      },
    ],
  }
}
