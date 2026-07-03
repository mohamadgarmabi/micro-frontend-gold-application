import type { ReactNode } from 'react'

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

export type {
  AppShellProps,
  AurumNavPage,
  CardProps,
  GoldBadgeProps,
  PriceTagProps,
  ToggleProps,
}
