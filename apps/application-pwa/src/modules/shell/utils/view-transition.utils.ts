import type { ViewTransitionInfo, ViewTransitionType } from '../types'

const APP_TAB_PATHS = ['/home', '/chart', '/trade', '/profile', '/options'] as const

const normalizePathname = (pathname: string) => {
  if (pathname === '/') {
    return '/home'
  }

  return pathname
}

const tabIndex = (pathname: string) => {
  return APP_TAB_PATHS.findIndex((path) => path === normalizePathname(pathname))
}

const resolveViewTransitionTypes = ({
  fromLocation,
  toLocation,
}: ViewTransitionInfo): ViewTransitionType[] => {
  if (!fromLocation) {
    return ['fade']
  }

  const fromPath = normalizePathname(fromLocation.pathname)
  const toPath = normalizePathname(toLocation.pathname)
  const fromTab = tabIndex(fromPath)
  const toTab = tabIndex(toPath)

  if (fromTab >= 0 && toTab >= 0) {
    if (fromTab === toTab) {
      return ['fade']
    }

    return fromTab < toTab ? ['slide-forward'] : ['slide-back']
  }

  if (fromPath === '/login' && toPath === '/otp') {
    return ['slide-forward']
  }

  if (fromPath === '/otp' && toPath === '/login') {
    return ['slide-back']
  }

  const fromHistory = fromLocation.state.__TSR_index
  const toHistory = toLocation.state.__TSR_index

  if (
    typeof fromHistory === 'number' &&
    typeof toHistory === 'number' &&
    fromHistory !== toHistory
  ) {
    return fromHistory < toHistory ? ['slide-forward'] : ['slide-back']
  }

  return ['fade']
}

export { resolveViewTransitionTypes }
