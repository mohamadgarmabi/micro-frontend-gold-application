import type { LiquidGlassSettingKey, LiquidGlassSettingRange } from "#/modules/shell/types"

const LIQUID_GLASS_STORAGE_KEY = "aurum:liquid-glass:v2"
const LEGACY_LIQUID_GLASS_DEPTH_STORAGE_KEY = "aurum:liquid-glass-depth:v1"

// Glisse's own bezel default for a ~66px-tall surface; the radius setting scales it.
const LIQUID_GLASS_BASE_BEZEL = 8

const LIQUID_GLASS_SETTING_KEYS: LiquidGlassSettingKey[] = [
  "depth",
  "blur",
  "dispersion",
  "radius",
  "specular",
]

const LIQUID_GLASS_SETTING_RANGES: Record<LiquidGlassSettingKey, LiquidGlassSettingRange> = {
  depth: { min: 0, max: 2.5, step: 0.1 },
  blur: { min: 0, max: 24, step: 1 },
  dispersion: { min: 0, max: 0.3, step: 0.01 },
  radius: { min: 0, max: 2, step: 0.1 },
  specular: { min: 0, max: 1, step: 0.05 },
}

export {
  LEGACY_LIQUID_GLASS_DEPTH_STORAGE_KEY,
  LIQUID_GLASS_BASE_BEZEL,
  LIQUID_GLASS_SETTING_KEYS,
  LIQUID_GLASS_SETTING_RANGES,
  LIQUID_GLASS_STORAGE_KEY,
}
