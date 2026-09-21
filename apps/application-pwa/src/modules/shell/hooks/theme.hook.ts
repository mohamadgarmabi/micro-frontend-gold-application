import { useEffect, useState } from "react"
import type { ResolvedTheme, ThemePreference } from "../types"
import {
  applyTheme,
  persistThemePreference,
  readThemePreference,
  readSystemTheme,
  resolveTheme,
} from "../utils/theme.utils"

/** Stable SSR defaults — must match `readThemePreference` / `readSystemTheme` without `window`. */
const SSR_THEME_PREFERENCE: ThemePreference = "system"
const SSR_RESOLVED_THEME: ResolvedTheme = "dark"

const useTheme = () => {
  const [preference, setPreference] = useState<ThemePreference>(SSR_THEME_PREFERENCE)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(SSR_RESOLVED_THEME)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const stored = readThemePreference()
    const resolved = resolveTheme(stored)
    setPreference(stored)
    setResolvedTheme(resolved)
    applyTheme(resolved)
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) {
      return
    }

    const nextTheme = resolveTheme(preference)
    setResolvedTheme(nextTheme)
    applyTheme(nextTheme)
    persistThemePreference(preference)
  }, [preference, isHydrated])

  useEffect(() => {
    if (!isHydrated || preference !== "system") {
      return
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      const nextTheme = readSystemTheme()
      setResolvedTheme(nextTheme)
      applyTheme(nextTheme)
    }

    media.addEventListener("change", handleChange)
    return () => media.removeEventListener("change", handleChange)
  }, [preference, isHydrated])

  const setTheme = (nextPreference: ThemePreference) => {
    setPreference(nextPreference)
  }

  const toggleTheme = () => {
    setPreference(resolvedTheme === "dark" ? "light" : "dark")
  }

  return {
    preference,
    resolvedTheme,
    isDark: resolvedTheme === "dark",
    isLight: resolvedTheme === "light",
    setTheme,
    toggleTheme,
  }
}

export { useTheme }
