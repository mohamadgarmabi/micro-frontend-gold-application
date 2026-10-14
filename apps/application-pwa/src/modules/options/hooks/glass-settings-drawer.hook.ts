import { useState } from "react"
import {
  LIQUID_GLASS_SETTING_KEYS,
  LIQUID_GLASS_SETTING_RANGES,
} from "#/config/liquid-glass.constants"
import { useI18n } from "#/modules/shell/hooks/i18n.hook"
import { useLiquidGlassPreference } from "#/modules/shell/hooks/liquid-glass.hook"
import type { LiquidGlassSettingKey, MessageKey } from "#/modules/shell/types"
import { formatLiquidGlassSetting } from "#/modules/shell/utils/liquid-glass.utils"
import type { GlassSettingControl } from "../types"

const settingCopy: Record<LiquidGlassSettingKey, { label: MessageKey; hint: MessageKey }> = {
  depth: { label: "options.glassDepth", hint: "options.glassDepthHint" },
  blur: { label: "options.glassBlur", hint: "options.glassBlurHint" },
  dispersion: { label: "options.glassDispersion", hint: "options.glassDispersionHint" },
  radius: { label: "options.glassRadius", hint: "options.glassRadiusHint" },
  specular: { label: "options.glassSpecular", hint: "options.glassSpecularHint" },
}

const useGlassSettingsDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { t, locale } = useI18n()
  const { settings, isDefault, setSetting, resetSettings } = useLiquidGlassPreference()

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const controls: GlassSettingControl[] = LIQUID_GLASS_SETTING_KEYS.map((key) => ({
    id: key,
    label: t(settingCopy[key].label),
    hint: t(settingCopy[key].hint),
    valueLabel: formatLiquidGlassSetting(key, settings[key], locale),
    value: settings[key],
    ...LIQUID_GLASS_SETTING_RANGES[key],
    onChange: (nextValue: number | number[]) => {
      const value = Array.isArray(nextValue) ? (nextValue[0] ?? settings[key]) : nextValue
      setSetting(key, value)
    },
  }))

  return {
    t,
    isOpen,
    handleOpen,
    handleOpenChange,
    controls,
    depthLabel: formatLiquidGlassSetting("depth", settings.depth, locale),
    handleReset: resetSettings,
    isResetDisabled: isDefault,
  }
}

export { useGlassSettingsDrawer }
