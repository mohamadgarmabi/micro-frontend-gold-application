import type { CSSProperties, ReactNode } from "react"

type LiquidGlassTint = "light" | "dark" | (string & {})

type LiquidGlassSettings = {
  /** Multiplier on refraction strength. */
  depth: number
  /** Backdrop frost in px. */
  blur: number
  /** Chromatic dispersion; 0 disables it. */
  dispersion: number
  /** Multiplier on each element's corner radius. Pills (>= 999) are unaffected. */
  radius: number
  /** Edge highlight strength, 0-1. */
  specular: number
}

type LiquidGlassProps = {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  cornerRadius?: number
  /** Overrides the default theme-token tint. */
  tint?: LiquidGlassTint
  /** Per-element refraction, multiplied by the global depth. */
  refraction?: number
  /** Overrides the global depth. */
  depth?: number
  /** Overrides the global blur. */
  frost?: number
  /** Overrides the global dispersion. */
  dispersion?: number
  /** Overrides the global specular. */
  specular?: number
  interactive?: boolean
  onClick?: () => void
}

type LiquidGlassModel = {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  radius: number
  tint: LiquidGlassTint
  refraction: number
  blur: number
  dispersion: number
  specular: number
  interactive: boolean
  onClick?: () => void
}

export type { LiquidGlassModel, LiquidGlassProps, LiquidGlassSettings, LiquidGlassTint }
