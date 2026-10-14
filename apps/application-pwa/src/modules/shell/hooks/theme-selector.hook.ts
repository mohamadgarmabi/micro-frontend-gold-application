import { Monitor, Moon, Sun } from "lucide-react"
import type { ThemePreference, ThemeSelectorOption } from "../types"
import { useI18n } from "./i18n.hook"

type UseThemeSelectorParams = {
  value: ThemePreference
  onChange: (value: ThemePreference) => void
}

const activeButtonClassName =
  "flex flex-col items-center gap-2 rounded-xl border px-3 py-3 transition-all duration-200 border-accent/40 bg-accent/10 text-foreground shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_24%,transparent)]"
const idleButtonClassName =
  "flex flex-col items-center gap-2 rounded-xl border px-3 py-3 transition-all duration-200 border-border bg-surface text-foreground-subtle hover:border-gold-600/20 hover:text-foreground"
const activeIconWrapClassName =
  "flex size-9 items-center justify-center rounded-full bg-gold-600/15 text-gold-600"
const idleIconWrapClassName =
  "flex size-9 items-center justify-center rounded-full bg-surface-muted text-foreground-subtle"

const useThemeSelector = ({ value, onChange }: UseThemeSelectorParams) => {
  const { t } = useI18n()

  const options: ThemeSelectorOption[] = [
    {
      value: "light",
      label: t("options.themeLight"),
      icon: Sun,
      isActive: value === "light",
      onSelect: () => onChange("light"),
      buttonClassName: value === "light" ? activeButtonClassName : idleButtonClassName,
      iconWrapClassName: value === "light" ? activeIconWrapClassName : idleIconWrapClassName,
    },
    {
      value: "dark",
      label: t("options.themeDark"),
      icon: Moon,
      isActive: value === "dark",
      onSelect: () => onChange("dark"),
      buttonClassName: value === "dark" ? activeButtonClassName : idleButtonClassName,
      iconWrapClassName: value === "dark" ? activeIconWrapClassName : idleIconWrapClassName,
    },
    {
      value: "system",
      label: t("options.themeSystem"),
      icon: Monitor,
      isActive: value === "system",
      onSelect: () => onChange("system"),
      buttonClassName: value === "system" ? activeButtonClassName : idleButtonClassName,
      iconWrapClassName: value === "system" ? activeIconWrapClassName : idleIconWrapClassName,
    },
  ]

  return { options }
}

export { useThemeSelector }
