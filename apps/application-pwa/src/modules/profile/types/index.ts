import type { LucideIcon } from 'lucide-react'

type HoldingRow = {
  label: string
  value: string
  sub: string
}

type ProfileMenuItem = {
  id: 'security' | 'alerts' | 'history' | 'kyc'
  icon: LucideIcon
  label: string
  sub: string
}

export type { HoldingRow, ProfileMenuItem }
