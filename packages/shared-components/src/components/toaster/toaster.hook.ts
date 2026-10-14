import { useEffect, useSyncExternalStore } from "react"
import type { ReactNode } from "react"
import { mergeClassName } from "../../lib/cn"
import type { GlassToastType } from "../glass-toast"
import { toasterItemStyles, toasterStyles } from "./toaster.styles"
import type {
  ToastApi,
  ToasterProps,
  ToastId,
  ToastOptions,
  ToastRecord,
  ToastShow,
} from "./toaster.type"

const DEFAULT_TOAST_DURATION = 4000
const DEFAULT_VISIBLE_TOASTS = 3
const SWIPE_DISMISS_DISTANCE = 80

const toastState: { toasts: ToastRecord[]; nextId: number } = { toasts: [], nextId: 1 }

const toastListeners = new Set<() => void>()

const subscribeToasts = (listener: () => void) => {
  toastListeners.add(listener)

  return () => {
    toastListeners.delete(listener)
  }
}

const getToasts = () => toastState.toasts

const emptyToasts: ToastRecord[] = []

const getServerToasts = () => emptyToasts

const setToasts = (toasts: ToastRecord[]) => {
  toastState.toasts = toasts
  toastListeners.forEach((listener) => listener())
}

const dismissToast = (id?: ToastId) => {
  if (id === undefined) {
    setToasts([])
    return
  }

  setToasts(toastState.toasts.filter((item) => item.id !== id))
}

const createToast =
  (type: GlassToastType): ToastShow =>
  (message: ReactNode, options: ToastOptions = {}) => {
    const id = options.id ?? toastState.nextId++
    const record: ToastRecord = {
      id,
      type,
      title: message,
      description: options.description,
      duration: options.duration ?? DEFAULT_TOAST_DURATION,
    }

    setToasts([record, ...toastState.toasts.filter((item) => item.id !== id)])

    return id
  }

const toast: ToastApi = Object.assign(createToast("default"), {
  message: createToast("default"),
  success: createToast("success"),
  error: createToast("error"),
  warning: createToast("warning"),
  info: createToast("info"),
  dismiss: dismissToast,
})

const useToaster = ({
  position = "top-right",
  dir,
  visibleToasts = DEFAULT_VISIBLE_TOASTS,
  className,
  label = "Notifications",
}: ToasterProps) => {
  const toasts = useSyncExternalStore(subscribeToasts, getToasts, getServerToasts)
  const isBottom = position.startsWith("bottom")

  return {
    toasts: toasts.slice(0, visibleToasts),
    dir,
    label,
    className: mergeClassName(toasterStyles({ position }), className),
    enterOffset: isBottom ? 16 : -16,
  }
}

const useToasterItem = (record: ToastRecord) => {
  const { id, duration } = record

  useEffect(() => {
    if (!Number.isFinite(duration)) {
      return undefined
    }

    const timer = window.setTimeout(() => dismissToast(id), duration)

    return () => {
      window.clearTimeout(timer)
    }
  }, [id, duration])

  const handleDragEnd = (_event: unknown, info: { offset: { x: number } }) => {
    if (Math.abs(info.offset.x) > SWIPE_DISMISS_DISTANCE) {
      dismissToast(id)
    }
  }

  return {
    className: toasterItemStyles(),
    role: record.type === "error" ? "alert" : "status",
    handleClose: () => dismissToast(id),
    handleDragEnd,
  }
}

export { toast, useToaster, useToasterItem }
