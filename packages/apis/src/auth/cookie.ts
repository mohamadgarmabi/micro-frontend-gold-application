import type { ApiCookieOptions } from '../config'
import { getApiConfig, getAuthCookieName } from '../config'

function readCookie(name: string, cookieSource?: string): string | null {
  const source =
    cookieSource ?? (typeof document !== 'undefined' ? document.cookie : '')

  if (!source) {
    return null
  }

  const parts = source.split('; ')

  for (const part of parts) {
    const separatorIndex = part.indexOf('=')

    if (separatorIndex === -1) {
      continue
    }

    const key = part.slice(0, separatorIndex)
    const value = part.slice(separatorIndex + 1)

    if (key === name) {
      return value ? decodeURIComponent(value) : null
    }
  }

  return null
}

function writeCookie(
  name: string,
  value: string,
  options?: ApiCookieOptions,
): void {
  if (typeof document === 'undefined') {
    return
  }

  const cookieOptions = options ?? {}
  const segments = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `path=${cookieOptions.path ?? '/'}`,
  ]

  if (cookieOptions.maxAge !== undefined) {
    segments.push(`max-age=${cookieOptions.maxAge}`)
  }

  if (cookieOptions.domain) {
    segments.push(`domain=${cookieOptions.domain}`)
  }

  if (cookieOptions.secure) {
    segments.push('secure')
  }

  if (cookieOptions.sameSite) {
    segments.push(`samesite=${cookieOptions.sameSite}`)
  }

  document.cookie = segments.join('; ')
}

function clearCookie(name: string, options?: ApiCookieOptions): void {
  if (typeof document === 'undefined') {
    return
  }

  const cookieOptions = options ?? {}
  const segments = [
    `${encodeURIComponent(name)}=`,
    'max-age=0',
    `path=${cookieOptions.path ?? '/'}`,
  ]

  if (cookieOptions.domain) {
    segments.push(`domain=${cookieOptions.domain}`)
  }

  document.cookie = segments.join('; ')
}

export function getAuthToken(cookieSource?: string): string | null {
  const cookieName = getAuthCookieName()

  if (!cookieName) {
    return null
  }

  return readCookie(cookieName, cookieSource)
}

export function hasAuthToken(cookieSource?: string): boolean {
  return Boolean(getAuthToken(cookieSource))
}

export function setAuthToken(token: string): void {
  const { auth } = getApiConfig()
  const cookieName = auth?.tokenCookieName

  if (!cookieName) {
    throw new Error(
      'auth.tokenCookieName is not configured. Set it in your app apiConfig.',
    )
  }

  writeCookie(cookieName, token, auth.cookie)
}

export function clearAuthToken(): void {
  const { auth } = getApiConfig()
  const cookieName = auth?.tokenCookieName

  if (!cookieName) {
    return
  }

  clearCookie(cookieName, auth.cookie)
}
