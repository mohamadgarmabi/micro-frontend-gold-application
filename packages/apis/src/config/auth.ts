export type ApiCookieOptions = {
  path?: string
  maxAge?: number
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  domain?: string
}

export type ApiAuthConfig = {
  tokenCookieName: string
  cookie?: ApiCookieOptions
}
