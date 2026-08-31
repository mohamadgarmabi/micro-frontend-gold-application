import type { PullRefreshLabels } from '@gold/pull-refresh'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
  showNav?: boolean
}

type AppShellModel = {
  onRefresh: () => Promise<void>
  pullRefreshLabels: PullRefreshLabels
}

type AurumNavPage = 'home' | 'chart' | 'trade' | 'profile' | 'options'

type CardProps = {
  children: ReactNode
  className?: string
}

type GoldBadgeProps = {
  children: ReactNode
  className?: string
}

type PriceTagProps = {
  value: number
  change: number
  size?: 'sm' | 'md' | 'lg'
}

type ToggleProps = {
  value: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
}

type Direction = 'rtl' | 'ltr'

type Locale = 'en' | 'fa'

type TranslateValues = Record<string, string | number>

type MessageKey = keyof typeof import('../utils/i18n.en').enMessages

type ThemePreference = 'light' | 'dark' | 'system'

type ResolvedTheme = 'light' | 'dark'

type ThemeSelectorOption = {
  value: ThemePreference
  label: string
  icon: LucideIcon
  isActive: boolean
  onSelect: () => void
  buttonClassName: string
  iconWrapClassName: string
}

type BottomNavItem = {
  page: AurumNavPage
  to: '/home' | '/chart' | '/trade' | '/profile' | '/options'
  icon: LucideIcon
  label: string
  isActive: boolean
  className: string
  strokeWidth: number
}

type BottomNavSlider = {
  x: number
  width: number
  isReady: boolean
}

type ViewTransitionType = 'slide-forward' | 'slide-back' | 'fade'

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
  AppShellModel,
  AppShellProps,
  AurumNavPage,
  BottomNavItem,
  BottomNavSlider,
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
