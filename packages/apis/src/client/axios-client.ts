import axios, { type AxiosInstance } from 'axios'
import { getApiConfig, setApiConfig } from '../config'
import type { ApiConfig } from '../config'
import { applyApiInterceptors } from './apply-interceptors'
import { resolveApiInterceptors } from './resolve-interceptors'

let client: AxiosInstance | null = null

function createClient(): AxiosInstance {
  const { baseURL, timeout, headers, auth, interceptors } = getApiConfig()

  const instance = axios.create({
    baseURL,
    timeout,
    headers,
  })

  applyApiInterceptors(instance, resolveApiInterceptors(auth, interceptors))

  return instance
}

export function configureApis(options: ApiConfig): AxiosInstance {
  setApiConfig(options)
  client = createClient()
  return client
}

export function getApiClient(): AxiosInstance {
  if (!client) {
    client = createClient()
  }

  return client
}
