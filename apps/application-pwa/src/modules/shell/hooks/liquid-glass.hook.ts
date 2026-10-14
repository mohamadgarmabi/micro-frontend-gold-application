import { LIQUID_GLASS_DEFAULT_SETTINGS } from "@gold/shared-components/liquid-glass"
import { useSelector } from "@tanstack/react-store"
import { useEffect } from "react"
import { LIQUID_GLASS_SETTING_KEYS } from "#/config/liquid-glass.constants"
import { liquidGlassStore } from "../stores/liquid-glass.store"
import type { LiquidGlassSettingKey } from "../types"

const useLiquidGlassSync = () => {
  useEffect(() => {
    liquidGlassStore.actions.syncFromStorage()
  }, [])
}

const useLiquidGlassPreference = () => {
  const settings = useSelector(liquidGlassStore, (state) => state)

  const setSetting = (key: LiquidGlassSettingKey, value: number) => {
    liquidGlassStore.actions.setSettings({ [key]: value })
  }

  const resetSettings = () => {
    liquidGlassStore.actions.setSettings(LIQUID_GLASS_DEFAULT_SETTINGS)
  }

  return {
    settings,
    isDefault: LIQUID_GLASS_SETTING_KEYS.every(
      (key) => settings[key] === LIQUID_GLASS_DEFAULT_SETTINGS[key],
    ),
    setSetting,
    resetSettings,
  }
}

export { useLiquidGlassPreference, useLiquidGlassSync }
