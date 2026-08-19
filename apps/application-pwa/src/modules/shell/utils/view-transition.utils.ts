import {
  DEFAULT_VIEW_TRANSITION_ENABLED,
  VIEW_TRANSITION_STORAGE_KEY,
} from '#/config/view-transition.constants'
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

  if ((fromPath === '/login' || fromPath === '/otp') && toPath === '/pin') {
    return ['slide-forward']
  }

  if (fromPath === '/pin' && (toPath === '/login' || toPath === '/otp')) {
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

const isViewTransitionEnabled = (value: string | null) => {
  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  return DEFAULT_VIEW_TRANSITION_ENABLED
}

const readViewTransitionEnabled = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_VIEW_TRANSITION_ENABLED
  }

  return isViewTransitionEnabled(localStorage.getItem(VIEW_TRANSITION_STORAGE_KEY))
}

const persistViewTransitionEnabled = (enabled: boolean) => {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(VIEW_TRANSITION_STORAGE_KEY, String(enabled))
}

const getDefaultViewTransition = (enabled: boolean) => {
  if (!enabled) {
    return false
  }

  return {
    types: resolveViewTransitionTypes,
  }
}

export {
  getDefaultViewTransition,
  persistViewTransitionEnabled,
  readViewTransitionEnabled,
  resolveViewTransitionTypes,
}
