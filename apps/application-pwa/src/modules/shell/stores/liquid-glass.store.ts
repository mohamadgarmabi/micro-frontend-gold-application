import {
  LIQUID_GLASS_DEFAULT_SETTINGS,
  setLiquidGlassSettings,
} from "@gold/shared-components/liquid-glass"
import { createStore } from "@tanstack/store"
import type { LiquidGlassSettings } from "../types"
import {
  normalizeLiquidGlassSettings,
  persistLiquidGlassSettings,
  readLiquidGlassSettings,
} from "../utils/liquid-glass.utils"

const liquidGlassStore = createStore(
  { ...LIQUID_GLASS_DEFAULT_SETTINGS } as LiquidGlassSettings,
  ({ setState }) => ({
    syncFromStorage: () => {
      const settings = readLiquidGlassSettings()
      setLiquidGlassSettings(settings)
      setState(() => settings)
      return settings
    },
    setSettings: (patch: Partial<LiquidGlassSettings>) => {
      let settings: LiquidGlassSettings = { ...LIQUID_GLASS_DEFAULT_SETTINGS }
      setState((current) => {
        settings = normalizeLiquidGlassSettings({ ...current, ...patch })
        return settings
      })
      persistLiquidGlassSettings(settings)
      setLiquidGlassSettings(settings)
      return settings
    },
  }),
)

export { liquidGlassStore }
