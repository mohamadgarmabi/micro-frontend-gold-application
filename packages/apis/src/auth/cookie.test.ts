import { setApiConfig } from '../config'
import { getAuthToken, hasAuthToken } from './cookie'

describe('auth cookie helpers', () => {
  beforeEach(() => {
    setApiConfig({
      auth: {
        tokenCookieName: 'auth-token',
      },
    })
  })

  it('reads the configured auth token from a cookie string', () => {
    const cookieSource = 'auth-token=abc123; other=value'

    expect(getAuthToken(cookieSource)).toBe('abc123')
  })

  it('returns null when the auth token cookie is missing', () => {
    expect(getAuthToken('other=value')).toBeNull()
    expect(hasAuthToken('other=value')).toBe(false)
  })

  it('returns true when the auth token cookie exists', () => {
    expect(hasAuthToken('auth-token=abc123')).toBe(true)
  })
})
