import type { AxiosInstance } from 'axios'
import type { ApiInterceptors } from '../config'

const applyApiInterceptors = (
  client: AxiosInstance,
  interceptors?: ApiInterceptors,
): void => {
  if (!interceptors) {
    return
  }

  for (const interceptor of interceptors.request ?? []) {
    client.interceptors.request.use(
      interceptor.onFulfilled,
      interceptor.onRejected,
      interceptor.options,
    )
  }

  for (const interceptor of interceptors.response ?? []) {
    client.interceptors.response.use(
      interceptor.onFulfilled,
      interceptor.onRejected,
    )
  }
}

export { applyApiInterceptors }
