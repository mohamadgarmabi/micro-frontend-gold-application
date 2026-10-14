import type { SwipeAction } from "@gold/shared-components/swipe-row"
import { toast } from "@gold/shared-components/toaster"
import { useState } from "react"
import { SPOT_PRICE } from "#/modules/market/utils/data"
import { fmt } from "#/modules/market/utils/format"
import { useDirection } from "#/modules/shell/hooks/direction.hook"
import { useI18n } from "#/modules/shell/hooks/i18n.hook"
import { useTheme } from "#/modules/shell/hooks/theme.hook"
import type { OrderRow, QuickAmount, TradeRecentOrder, TradeSide, TradeSwipeTheme } from "../types"

const QUICK_AMOUNTS = [0.5, 1, 2, 5]
const SPREAD = 2.5
const FEE_RATE = 0.0015

const resolveSwipeTheme = (isLight: boolean): TradeSwipeTheme => {
  if (isLight) {
    return {
      rowColor: "#ffffff",
      drawerColor: "#e8ebe9",
      textColor: "#111827",
      actionColor: "#e5484d",
    }
  }

  return {
    rowColor: "#1c211e",
    drawerColor: "#2a302c",
    textColor: "#f4f7f5",
    actionColor: "#e5484d",
  }
}

const useTrade = () => {
  const { t } = useI18n()
  const { direction } = useDirection()
  const { isLight } = useTheme()
  const [side, setSide] = useState<TradeSide>("buy")
  const [amount, setAmount] = useState("1.00")
  const [hiddenOrderIds, setHiddenOrderIds] = useState<string[]>([])
  const numericAmount = parseFloat(amount || "0")
  const execPrice = side === "buy" ? SPOT_PRICE + SPREAD / 2 : SPOT_PRICE - SPREAD / 2
  const total = numericAmount * execPrice
  const fee = total * FEE_RATE
  const formattedAmount = numericAmount.toFixed(2)
  const isBuy = side === "buy"
  const swipeDirection = direction === "rtl" ? ("right" as const) : ("left" as const)
  const swipeTheme = resolveSwipeTheme(isLight)

  const decrementAmount = () => {
    setAmount(Math.max(0.01, numericAmount - 0.25).toFixed(2))
  }

  const incrementAmount = () => {
    setAmount((numericAmount + 0.25).toFixed(2))
  }

  const setQuickAmount = (value: number) => {
    setAmount(value.toFixed(2))
  }

  const handleSideChange = (value: string) => {
    setSide(value as TradeSide)
  }

  const handleSubmit = () => {
    toast.success(t(isBuy ? "trade.buyToast" : "trade.sellToast", { amount }))
  }

  const quickAmounts: QuickAmount[] = QUICK_AMOUNTS.map((value) => ({
    value,
    label: t("trade.quickAmount", { amount: value }),
    onSelect: () => setQuickAmount(value),
  }))

  const orderRows: OrderRow[] = [
    { label: t("trade.quantity"), value: t("trade.quantityValue", { amount: formattedAmount }) },
    { label: t("trade.price"), value: t("trade.priceValue", { price: fmt(execPrice) }) },
    { label: t("trade.subtotal"), value: `$${fmt(total)}` },
    { label: t("trade.fee"), value: `$${fmt(fee)}` },
  ]

  const recentOrders: TradeRecentOrder[] = [
    {
      id: "order-buy-1",
      sideLabel: t("trade.buy"),
      sideColor: "success" as const,
      amountLabel: "1.00 oz",
      priceLabel: `$${fmt(SPOT_PRICE + 1.1)}`,
      timeLabel: "09:42",
      contentClassName: "flex w-full items-center justify-between",
      label: `${t("trade.buy")} 1.00 oz`,
      swipeDirection,
      swipeTheme,
      swipeActions: [{ id: "delete", label: t("options.remove"), dismiss: true }],
      onCommit: (_action: SwipeAction) => {
        setHiddenOrderIds((current) => [...current, "order-buy-1"])
        toast.success(t("trade.toastOrderRemoved"))
      },
    },
    {
      id: "order-sell-1",
      sideLabel: t("trade.sell"),
      sideColor: "danger" as const,
      amountLabel: "0.50 oz",
      priceLabel: `$${fmt(SPOT_PRICE - 0.8)}`,
      timeLabel: "08:15",
      contentClassName: "flex w-full items-center justify-between",
      label: `${t("trade.sell")} 0.50 oz`,
      swipeDirection,
      swipeTheme,
      swipeActions: [{ id: "delete", label: t("options.remove"), dismiss: true }],
      onCommit: (_action: SwipeAction) => {
        setHiddenOrderIds((current) => [...current, "order-sell-1"])
        toast.success(t("trade.toastOrderRemoved"))
      },
    },
    {
      id: "order-buy-2",
      sideLabel: t("trade.buy"),
      sideColor: "success" as const,
      amountLabel: "2.00 oz",
      priceLabel: `$${fmt(SPOT_PRICE + 0.4)}`,
      timeLabel: "Yesterday",
      contentClassName: "flex w-full items-center justify-between",
      label: `${t("trade.buy")} 2.00 oz`,
      swipeDirection,
      swipeTheme,
      swipeActions: [{ id: "delete", label: t("options.remove"), dismiss: true }],
      onCommit: (_action: SwipeAction) => {
        setHiddenOrderIds((current) => [...current, "order-buy-2"])
        toast.success(t("trade.toastOrderRemoved"))
      },
    },
  ].filter((order) => !hiddenOrderIds.includes(order.id))

  return {
    t,
    side,
    amount,
    setAmount,
    decrementAmount,
    incrementAmount,
    handleSideChange,
    handleSubmit,
    execPriceLabel: `$${fmt(execPrice)}`,
    spreadSpotLabel: t("trade.spreadSpot", { spread: fmt(SPREAD), spot: fmt(SPOT_PRICE) }),
    totalLabel: `$${fmt(total + fee)}`,
    submitLabel: t(isBuy ? "trade.buyAction" : "trade.sellAction", { amount }),
    submitClassName: isBuy
      ? "bg-success text-white shadow-lg shadow-success/25 hover:bg-success/90"
      : "bg-danger text-white shadow-lg shadow-danger/25 hover:bg-danger/90",
    quickAmounts,
    orderRows,
    recentOrders,
  }
}

export { useTrade }
