import type { ReactNode } from "react"

type GlassToastType = "default" | "success" | "error" | "warning" | "info"

type GlassToastProps = {
  id: string | number
  type: GlassToastType
  title: ReactNode
  description?: ReactNode
  closeLabel?: string
  onClose: () => void
}

export type { GlassToastProps, GlassToastType }
