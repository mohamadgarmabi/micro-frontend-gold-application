import type { ReactNode } from "react"
import type { GlassToastType } from "../glass-toast"

type ToastId = string | number

type ToasterPosition =
  "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"

type ToastOptions = {
  id?: ToastId
  description?: ReactNode
  /** Milliseconds before auto-dismiss. `Infinity` keeps the toast until closed. */
  duration?: number
}

type ToastRecord = {
  id: ToastId
  type: GlassToastType
  title: ReactNode
  description?: ReactNode
  duration: number
}

type ToastShow = (message: ReactNode, options?: ToastOptions) => ToastId

type ToastApi = ToastShow & {
  message: ToastShow
  success: ToastShow
  error: ToastShow
  warning: ToastShow
  info: ToastShow
  /** Dismisses one toast, or all of them when called without an id. */
  dismiss: (id?: ToastId) => void
}

type ToasterProps = {
  position?: ToasterPosition
  dir?: "rtl" | "ltr"
  /** Maximum number of toasts shown at once; older ones are dropped. */
  visibleToasts?: number
  className?: string
  label?: string
}

type ToasterItemProps = {
  toast: ToastRecord
  /** Vertical offset the toast enters from, towards the screen edge. */
  enterOffset: number
}

export type {
  ToastApi,
  ToasterItemProps,
  ToasterPosition,
  ToasterProps,
  ToastId,
  ToastOptions,
  ToastRecord,
  ToastShow,
}
