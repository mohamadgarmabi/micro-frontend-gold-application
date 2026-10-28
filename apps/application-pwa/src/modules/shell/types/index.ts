import type { LiquidGlassSettings } from "@gold/shared-components/liquid-glass"
import type { PullRefreshLabels } from "@gold/shared-components/pull-refresh"
import type { LucideIcon } from "lucide-react"
import type { TabBarItem } from "glisse"
import type { ComponentProps, ReactNode } from "react"

type AppShellProps = {
  children: ReactNode
  showNav?: boolean
}

type AppShellModel = {
  onRefresh: () => Promise<void>
  pullRefreshLabels: PullRefreshLabels
}

type AurumNavPage = "home" | "chart" | "trade" | "profile" | "options"

type CardProps = {
  children: ReactNode
  className?: string
}

type GoldBadgeProps = {
  children: ReactNode
  className?: string
  color?: "success" | "warning" | "danger"
}

type PriceTagProps = {
  value: number
  change: number
  size?: "sm" | "md" | "lg"
}

type ToggleProps = {
  value: boolean
  onChange: (value: boolean) => void
  label: string
  disabled?: boolean
}

type Direction = "rtl" | "ltr"

type Locale = "en" | "fa"

type TranslateValues = Record<string, string | number>

type MessageKey = keyof typeof import("../utils/i18n.en").enMessages

type ThemePreference = "light" | "dark" | "system"

type ResolvedTheme = "light" | "dark"

type ThemeSelectorOption = {
  value: ThemePreference
  label: string
  icon: LucideIcon
  isActive: boolean
  onSelect: () => void
  buttonClassName: string
  iconWrapClassName: string
}

type BottomNavPath = "/home" | "/chart" | "/trade" | "/profile" | "/options"

type BottomNavItem = TabBarItem & {
  value: AurumNavPage
  href: BottomNavPath
}

type SideNavItem = {
  page: AurumNavPage
  to: BottomNavPath
  icon: LucideIcon
  label: string
  ariaCurrent: "page" | undefined
  className: string
}

type BottomNavLabelProps = {
  icon: LucideIcon
  label: string
}

type BottomNavLinkProps = Omit<ComponentProps<"a">, "href" | "ref"> & {
  href: BottomNavPath
}

type LiquidGlassSettingKey = keyof LiquidGlassSettings

type LiquidGlassSettingRange = {
  min: number
  max: number
  step: number
}

type ViewTransitionType = "slide-forward" | "slide-back" | "fade"

type ViewTransitionLocation = {
  pathname: string
  state: {
    __TSR_index?: number
  }
}

type ViewTransitionInfo = {
  fromLocation?: ViewTransitionLocation | null
  toLocation: ViewTransitionLocation
}

export type {
  LiquidGlassSettingKey,
  LiquidGlassSettingRange,
  LiquidGlassSettings,
  AppShellModel,
  AppShellProps,
  AurumNavPage,
  BottomNavItem,
  BottomNavLabelProps,
  SideNavItem,
  BottomNavLinkProps,
  CardProps,
  Direction,
  GoldBadgeProps,
  Locale,
  MessageKey,
  PriceTagProps,
  ResolvedTheme,
  ThemePreference,
  ThemeSelectorOption,
  ToggleProps,
  TranslateValues,
  ViewTransitionInfo,
  ViewTransitionLocation,
  ViewTransitionType,
}
