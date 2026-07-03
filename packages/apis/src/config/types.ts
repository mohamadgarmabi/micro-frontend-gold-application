import type { AxiosRequestConfig } from 'axios'
import type { ApiAuthConfig } from './auth'
import type { ApiInterceptors } from './interceptors'

export type ApiConfig = {
  baseURL?: string
  timeout?: number
  headers?: AxiosRequestConfig['headers']
  auth?: ApiAuthConfig
  interceptors?: ApiInterceptors
}

export type ResolvedApiConfig = {
  baseURL: string
  timeout: number
  headers?: AxiosRequestConfig['headers']
  auth?: ApiAuthConfig
  interceptors?: ApiInterceptors
}
