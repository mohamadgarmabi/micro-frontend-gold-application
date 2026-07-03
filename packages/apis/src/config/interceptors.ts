import type {
  AxiosError,
  AxiosInterceptorOptions,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export type ApiRequestInterceptor = {
  onFulfilled?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  onRejected?: (error: unknown) => unknown
  options?: AxiosInterceptorOptions
}

export type ApiResponseInterceptor = {
  onFulfilled?: (
    response: AxiosResponse,
  ) => AxiosResponse | Promise<AxiosResponse>
  onRejected?: (error: AxiosError) => unknown
}

export type ApiInterceptors = {
  request?: ApiRequestInterceptor[]
  response?: ApiResponseInterceptor[]
}
