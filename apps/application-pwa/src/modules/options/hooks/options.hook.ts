import type { SwipeAction } from "@gold/shared-components/swipe-row"
import { toast } from "@gold/shared-components/toaster"
import { Check, Clock, Fingerprint } from "lucide-react"
import { createElement, useState } from "react"
import { SPOT_PRICE } from "#/modules/market/utils/data"
import { fmt } from "#/modules/market/utils/format"
import { useWebAuthn } from "#/modules/auth/hooks/webauthn.hook"
import { useDirection } from "#/modules/shell/hooks/direction.hook"
import { useI18n } from "#/modules/shell/hooks/i18n.hook"
import { useTheme } from "#/modules/shell/hooks/theme.hook"
import { useViewTransitionPreference } from "#/modules/shell/hooks/view-transition.hook"
import type { Direction, ThemePreference } from "#/modules/shell/types"
import { resolveLocale, translate } from "#/modules/shell/utils/i18n.utils"
import type { OptionsSwipeTheme, SavedAlert } from "../types"

const currencyOptions = ["USD", "EUR", "GBP", "AED"]

const resolveSwipeTheme = (isLight: boolean): OptionsSwipeTheme => {
  if (isLight) {
    return {
      rowColor: "#f4f7f5",
      drawerColor: "#e4e9e6",
      textColor: "#111827",
      actionColor: "#e5484d",
    }
  }

  return {
    rowColor: "#222825",
    drawerColor: "#2f3632",
    textColor: "#f4f7f5",
    actionColor: "#e5484d",
  }
}

const useOptions = () => {
  const [notifications, setNotifications] = useState(true)
  const [currency, setCurrency] = useState("USD")
  const [priceAlert, setPriceAlert] = useState("3350")
  const [removedAlertIds, setRemovedAlertIds] = useState<string[]>([])
  const [addedAlerts, setAddedAlerts] = useState<{ id: string; value: number }[]>([])
  const { direction, setDirection } = useDirection()
  const { preference, setTheme, isLight } = useTheme()
  const { enabled: viewTransitionEnabled, setEnabled: setViewTransitionEnabled } =
    useViewTransitionPreference()
  const { t } = useI18n()
  const swipeDirection = direction === "rtl" ? ("right" as const) : ("left" as const)
  const swipeTheme = resolveSwipeTheme(isLight)
  const {
    hasCredential: biometric,
    biometricHint,
    isBiometricDisabled,
    handleBiometricToggle,
  } = useWebAuthn()

  const handleThemeChange = (nextTheme: ThemePreference) => {
    setTheme(nextTheme)
    const labels = {
      light: t("options.toastLight"),
      dark: t("options.toastDark"),
      system: t("options.toastSystem"),
    }
    toast.info(labels[nextTheme])
  }

  const handleDirectionChange = (next: string | string[]) => {
    if (typeof next !== "string") {
      return
    }

    if (next !== "rtl" && next !== "ltr") {
      return
    }

    const nextDirection = next as Direction
    setDirection(nextDirection)
    toast.info(
      translate(
        resolveLocale(nextDirection),
        nextDirection === "rtl" ? "options.toastRtl" : "options.toastLtr",
      ),
    )
  }

  const handleViewTransitionChange = (enabled: boolean) => {
    setViewTransitionEnabled(enabled)
    toast.info(t(enabled ? "options.toastViewTransitionOn" : "options.toastViewTransitionOff"))
  }

  const handleNotificationsChange = (enabled: boolean) => {
    setNotifications(enabled)
  }

  const handleBiometricSelect = (enabled: boolean) => {
    if (isBiometricDisabled) {
      return
    }

    handleBiometricToggle(enabled)
  }

  const priceAlertValue = parseFloat(priceAlert.replace(/,/g, ""))
  const isPriceAlertValid = Number.isFinite(priceAlertValue) && priceAlertValue > 0

  const handleSaveAlert = () => {
    if (!isPriceAlertValid) {
      toast.error(t("options.invalidAlert"))
      return
    }

    const id = `custom-alert-${priceAlertValue}`
    setAddedAlerts((current) =>
      current.some((alert) => alert.id === id)
        ? current
        : [{ id, value: priceAlertValue }, ...current],
    )
    setRemovedAlertIds((current) => current.filter((alertId) => alertId !== id))
    toast.success(t("options.toastAlert"))
  }

  const directionSelectOptions = [
    { value: "rtl", label: t("options.directionRtl") },
    { value: "ltr", label: t("options.directionLtr") },
  ]

  const currencySelectOptions = currencyOptions.map((code) => ({
    value: code,
    label: code,
  }))

  const handleCurrencyChange = (next: string | string[]) => {
    if (typeof next === "string") {
      setCurrency(next)
    }
  }

  const savedAlerts: SavedAlert[] = [
    ...addedAlerts.map((alert) => {
      const price = `$${fmt(alert.value)}`
      const directionLabel = t(alert.value >= SPOT_PRICE ? "options.above" : "options.below")

      return {
        id: alert.id,
        price,
        directionLabel,
        contentClassName: "flex w-full items-center gap-2",
        icon: Check,
        iconClassName: "text-gold-600",
        label: `${price} ${directionLabel}`,
        swipeDirection,
        swipeTheme,
        swipeActions: [{ id: "delete", label: t("options.remove"), dismiss: true }],
        onCommit: (_action: SwipeAction) => {
          setRemovedAlertIds((current) => [...current, alert.id])
          toast.success(t("options.toastAlertRemoved"))
        },
      }
    }),
    {
      id: "alert-3400",
      price: "$3,400",
      directionLabel: t("options.above"),
      contentClassName: "flex w-full items-center gap-2",
      icon: Check,
      iconClassName: "text-gold-600",
      label: `$3,400 ${t("options.above")}`,
      swipeDirection,
      swipeTheme,
      swipeActions: [{ id: "delete", label: t("options.remove"), dismiss: true }],
      onCommit: (_action: SwipeAction) => {
        setRemovedAlertIds((current) => [...current, "alert-3400"])
        toast.success(t("options.toastAlertRemoved"))
      },
    },
    {
      id: "alert-3200",
      price: "$3,200",
      directionLabel: t("options.below"),
      contentClassName: "flex w-full items-center gap-2",
      icon: Check,
      iconClassName: "text-gold-600",
      label: `$3,200 ${t("options.below")}`,
      swipeDirection,
      swipeTheme,
      swipeActions: [{ id: "delete", label: t("options.remove"), dismiss: true }],
      onCommit: (_action: SwipeAction) => {
        setRemovedAlertIds((current) => [...current, "alert-3200"])
        toast.success(t("options.toastAlertRemoved"))
      },
    },
    {
      id: "alert-3100",
      price: "$3,100",
      directionLabel: t("options.below"),
      contentClassName: "flex w-full items-center gap-2 opacity-60",
      icon: Clock,
      iconClassName: "text-foreground-subtle",
      label: `$3,100 ${t("options.below")}`,
      swipeDirection,
      swipeTheme,
      swipeActions: [{ id: "delete", label: t("options.remove"), dismiss: true }],
      onCommit: (_action: SwipeAction) => {
        setRemovedAlertIds((current) => [...current, "alert-3100"])
        toast.success(t("options.toastAlertRemoved"))
      },
    },
  ].filter((alert) => !removedAlertIds.includes(alert.id))

  const aboutItems = [t("options.terms"), t("options.privacy"), t("options.disclosures")]

  return {
    t,
    notifications,
    handleNotificationsChange,
    biometric,
    biometricHint,
    biometricIcon: createElement(Fingerprint, { size: 16, strokeWidth: 1.8 }),
    isBiometricDisabled,
    handleBiometricSelect,
    priceAlert,
    setPriceAlert,
    direction,
    directionSelectOptions,
    preference,
    handleThemeChange,
    handleDirectionChange,
    handleViewTransitionChange,
    viewTransitionEnabled,
    handleSaveAlert,
    savedAlerts,
    aboutItems,
    currency,
    currencySelectOptions,
    handleCurrencyChange,
  }
}

export { useOptions }
