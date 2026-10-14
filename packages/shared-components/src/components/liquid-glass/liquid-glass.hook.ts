import { useSyncExternalStore } from "react"
import { mergeClassName } from "../../lib/cn"
import { liquidGlassStyles } from "./liquid-glass.styles"
import type { LiquidGlassModel, LiquidGlassProps, LiquidGlassSettings } from "./liquid-glass.type"

const PILL_RADIUS = 999

// Built from theme tokens, so the same tint reads as clear glass in light and dark themes.
const LIQUID_GLASS_DEFAULT_TINT = "color-mix(in oklab, var(--surface) 38%, transparent)"

const LIQUID_GLASS_DEFAULT_SETTINGS: LiquidGlassSettings = {
  depth: 1,
  blur: 6,
  dispersion: 0.06,
  radius: 1,
  specular: 1,
}

const settingsState = { value: LIQUID_GLASS_DEFAULT_SETTINGS }

const settingsListeners = new Set<() => void>()

const subscribeSettings = (listener: () => void) => {
  settingsListeners.add(listener)

  return () => {
    settingsListeners.delete(listener)
  }
}

const getSettings = () => settingsState.value

const isValidSetting = (value: number | undefined) =>
  value === undefined || (Number.isFinite(value) && value >= 0)

const setLiquidGlassSettings = (settings: Partial<LiquidGlassSettings>) => {
  const isValid = Object.values(settings).every(isValidSetting)

  if (!isValid) {
    return
  }

  const current = settingsState.value
  const next = { ...current, ...settings }
  const hasChanged = (Object.keys(next) as (keyof LiquidGlassSettings)[]).some(
    (key) => next[key] !== current[key],
  )

  if (!hasChanged) {
    return
  }

  settingsState.value = next
  settingsListeners.forEach((listener) => listener())
}

const useLiquidGlassSettings = () =>
  useSyncExternalStore(subscribeSettings, getSettings, getSettings)

const resolveRadius = (cornerRadius: number, scale: number) =>
  cornerRadius >= PILL_RADIUS ? cornerRadius : Math.round(cornerRadius * scale)

const useLiquidGlass = ({
  children,
  className,
  style,
  cornerRadius = 24,
  tint,
  refraction = 1,
  depth,
  frost,
  dispersion,
  specular,
  interactive = false,
  onClick,
}: LiquidGlassProps): LiquidGlassModel => {
  const settings = useLiquidGlassSettings()

  return {
    children,
    className: mergeClassName(liquidGlassStyles(), className),
    style,
    radius: resolveRadius(cornerRadius, settings.radius),
    tint: tint ?? LIQUID_GLASS_DEFAULT_TINT,
    refraction: refraction * (depth ?? settings.depth),
    blur: frost ?? settings.blur,
    dispersion: dispersion ?? settings.dispersion,
    specular: specular ?? settings.specular,
    interactive,
    onClick,
  }
}

export {
  LIQUID_GLASS_DEFAULT_SETTINGS,
  setLiquidGlassSettings,
  useLiquidGlass,
  useLiquidGlassSettings,
}
