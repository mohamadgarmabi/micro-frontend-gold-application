import { useEffect, useState } from 'react'
import type { ResolvedTheme, ThemePreference } from '../types'
import {
  applyTheme,
  persistThemePreference,
  readThemePreference,
  readSystemTheme,
  resolveTheme,
} from '../utils/theme.utils'

function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(readThemePreference)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(readThemePreference()),
  )

  useEffect(() => {
    const nextTheme = resolveTheme(preference)
    setResolvedTheme(nextTheme)
    applyTheme(nextTheme)
    persistThemePreference(preference)
  }, [preference])

  useEffect(() => {
    if (preference !== 'system') {
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      const nextTheme = readSystemTheme()
      setResolvedTheme(nextTheme)
      applyTheme(nextTheme)
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [preference])

  const setTheme = (nextPreference: ThemePreference) => {
    setPreference(nextPreference)
  }

  const toggleTheme = () => {
    setPreference(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return {
    preference,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    setTheme,
    toggleTheme,
  }
}

export { useTheme }
