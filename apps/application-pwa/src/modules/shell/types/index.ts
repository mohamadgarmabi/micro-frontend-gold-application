import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

type AppShellProps = {
  children: ReactNode
  showNav?: boolean
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
}

type ThemePreference = 'light' | 'dark' | 'system'

type ResolvedTheme = 'light' | 'dark'

type BottomNavItem = {
  page: AurumNavPage
  to: '/home' | '/chart' | '/trade' | '/profile' | '/options'
  icon: LucideIcon
  label: string
}

type BottomNavSlider = {
  x: number
  width: number
  isReady: boolean
}

type SearchResult = {
  id: string
  title: string
  subtitle: string
  href: '/home' | '/chart' | '/trade' | '/profile' | '/options'
}

export type {
  AppShellProps,
  AurumNavPage,
  BottomNavItem,
  BottomNavSlider,
  CardProps,
  GoldBadgeProps,
  PriceTagProps,
  ResolvedTheme,
  SearchResult,
  ThemePreference,
  ToggleProps,
}
