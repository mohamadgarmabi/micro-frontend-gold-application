import { LIQUID_GLASS_DEFAULT_SETTINGS } from "@gold/shared-components/liquid-glass"
import {
  LEGACY_LIQUID_GLASS_DEPTH_STORAGE_KEY,
  LIQUID_GLASS_SETTING_KEYS,
  LIQUID_GLASS_SETTING_RANGES,
  LIQUID_GLASS_STORAGE_KEY,
} from "#/config/liquid-glass.constants"
import type { LiquidGlassSettingKey, LiquidGlassSettings, Locale } from "../types"

const normalizeLiquidGlassSetting = (key: LiquidGlassSettingKey, value: unknown) => {
  const { min, max, step } = LIQUID_GLASS_SETTING_RANGES[key]
  const numeric = typeof value === "number" ? value : Number(value)

  if (!Number.isFinite(numeric)) {
    return LIQUID_GLASS_DEFAULT_SETTINGS[key]
  }

  const clamped = Math.min(max, Math.max(min, numeric))

  return Number((Math.round(clamped / step) * step).toFixed(2))
}

const normalizeLiquidGlassSettings = (value: Partial<Record<LiquidGlassSettingKey, unknown>>) =>
  Object.fromEntries(
    LIQUID_GLASS_SETTING_KEYS.map((key) => [
      key,
      key in value
        ? normalizeLiquidGlassSetting(key, value[key])
        : LIQUID_GLASS_DEFAULT_SETTINGS[key],
    ]),
  ) as LiquidGlassSettings

const parseStoredSettings = (raw: string) => {
  try {
    const parsed: unknown = JSON.parse(raw)

    return typeof parsed === "object" && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

const readLiquidGlassSettings = (): LiquidGlassSettings => {
  if (typeof window === "undefined") {
    return { ...LIQUID_GLASS_DEFAULT_SETTINGS }
  }

  const stored = localStorage.getItem(LIQUID_GLASS_STORAGE_KEY)

  if (stored !== null) {
    return normalizeLiquidGlassSettings(parseStoredSettings(stored))
  }

  const legacyDepth = localStorage.getItem(LEGACY_LIQUID_GLASS_DEPTH_STORAGE_KEY)

  if (legacyDepth !== null) {
    return normalizeLiquidGlassSettings({ depth: legacyDepth })
  }

  return { ...LIQUID_GLASS_DEFAULT_SETTINGS }
}

const persistLiquidGlassSettings = (settings: LiquidGlassSettings) => {
  if (typeof window === "undefined") {
    return
  }

  localStorage.setItem(LIQUID_GLASS_STORAGE_KEY, JSON.stringify(settings))
  localStorage.removeItem(LEGACY_LIQUID_GLASS_DEPTH_STORAGE_KEY)
}

const formatLiquidGlassSetting = (key: LiquidGlassSettingKey, value: number, locale: Locale) => {
  const digits = key === "blur" ? 0 : key === "dispersion" || key === "specular" ? 2 : 1
  const formatted = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)

  if (key === "blur") {
    return `${formatted}px`
  }

  if (key === "depth" || key === "radius") {
    return `${formatted}×`
  }

  return formatted
}

export {
  formatLiquidGlassSetting,
  normalizeLiquidGlassSettings,
  persistLiquidGlassSettings,
  readLiquidGlassSettings,
}
