import { THEME_META_COLORS, THEME_STORAGE_KEY } from '#/config/theme.constants'
import type { ResolvedTheme, ThemePreference } from '../types'

function readSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readThemePreference(): ThemePreference {
  if (typeof window === 'undefined') {
    return 'system'
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return stored === 'light' || stored === 'dark' || stored === 'system'
    ? stored
    : 'system'
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === 'system') {
    return readSystemTheme()
  }

  return preference
}

function updateThemeColorMeta(theme: ResolvedTheme): void {
  if (typeof document === 'undefined') {
    return
  }

  const meta = document.querySelector('meta[name="theme-color"]')
  if (!meta) {
    return
  }

  meta.setAttribute('content', THEME_META_COLORS[theme])
}

function applyTheme(theme: ResolvedTheme): void {
  if (typeof document === 'undefined') {
    return
  }

  const root = document.documentElement
  root.classList.add('theme-transition')
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  root.style.colorScheme = theme
  updateThemeColorMeta(theme)

  window.setTimeout(() => {
    root.classList.remove('theme-transition')
  }, 300)
}

function persistThemePreference(preference: ThemePreference): void {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(THEME_STORAGE_KEY, preference)
}

export {
  applyTheme,
  persistThemePreference,
  readSystemTheme,
  readThemePreference,
  resolveTheme,
  updateThemeColorMeta,
}
