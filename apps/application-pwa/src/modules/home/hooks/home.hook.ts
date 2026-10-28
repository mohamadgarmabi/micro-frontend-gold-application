import { marketController } from "@gold/apis"
import type { SwipeAction } from "@gold/shared-components/swipe-row"
import { toast } from "@gold/shared-components/toaster"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { ArrowDownToLine, ArrowUpFromLine, FileText, Truck } from "lucide-react"
import { useState } from "react"
import { useMarketLive } from "#/modules/market/hooks/market-live.hook"
import { fmt } from "#/modules/market/utils/format"
import { useDirection } from "#/modules/shell/hooks/direction.hook"
import { useI18n } from "#/modules/shell/hooks/i18n.hook"
import { useTheme } from "#/modules/shell/hooks/theme.hook"
import type { MessageKey } from "#/modules/shell/types"
import type { TradeSide } from "#/modules/trade/types"
import type {
  HomeActivityRow,
  HomeHeaderModel,
  HomeMarketRow,
  HomeQuoteModel,
  HomeSwipeTheme,
  HomeTradeAction,
  HomeWallet,
  QuickAction,
} from "../types"

const CASH_TOMAN = "12,450,000"
const VAULT_SOT = "1,250"
const QUICK_TILE_CLASS =
  "flex size-14 mx-auto items-center justify-center rounded-[var(--radius)] text-foreground"

const marketNameKey: Record<string, MessageKey> = {
  "XAU/USD": "market.goldSpot",
  "XAG/USD": "market.silverSpot",
  "XPT/USD": "market.platinum",
  "XPD/USD": "market.palladium",
}

const greetingKey = (hour: number) => {
  if (hour < 12) {
    return "home.greeting" as const
  }

  if (hour < 18) {
    return "home.greetingAfternoon" as const
  }

  return "home.greetingEvening" as const
}

const resolveSwipeTheme = (isLight: boolean): HomeSwipeTheme => {
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

const useHome = () => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { direction } = useDirection()
  const { isLight } = useTheme()
  const { data: overview } = useQuery(marketController.getOverview())
  const { status } = useMarketLive()
  const [hiddenActivityIds, setHiddenActivityIds] = useState<string[]>([])

  const spotPrice = overview?.spotPrice ?? 0
  const goldChange = overview?.change ?? 0
  const assets = overview?.assets ?? []
  const recentActivity = overview?.recentActivity ?? []
  const swipeDirection = direction === "rtl" ? ("right" as const) : ("left" as const)
  const swipeTheme = resolveSwipeTheme(isLight)

  const openChart = () => {
    void navigate({ to: "/chart" })
  }

  const openTrade = (side: TradeSide) => {
    void navigate({ to: "/trade", search: { side } })
  }

  const streamStatus =
    status === "connected"
      ? { liveLabel: t("home.liveNow"), liveColor: "success" as const }
      : status === "connecting"
        ? { liveLabel: t("home.connecting"), liveColor: "warning" as const }
        : { liveLabel: t("home.disconnected"), liveColor: "danger" as const }

  const header: HomeHeaderModel = {
    greeting: t(greetingKey(new Date().getHours())),
    brandName: t("home.brand"),
    chartLabel: t("home.openChart"),
    onOpenChart: openChart,
  }

  const quote: HomeQuoteModel = {
    eyebrow: t("home.goldSpotPrice"),
    pairLabel: t("home.pairXau"),
    liveLabel: streamStatus.liveLabel,
    liveColor: streamStatus.liveColor,
    chartLabel: t("home.viewChart"),
    price: spotPrice,
    change: goldChange,
    onOpenChart: openChart,
  }

  const tradeActions: HomeTradeAction[] = [
    {
      label: t("home.buyGold"),
      tint: "var(--accent)",
      onSelect: () => openTrade("buy"),
    },
    {
      label: t("home.sellGold"),
      tint: "var(--danger)",
      onSelect: () => openTrade("sell"),
    },
  ]

  const wallets: HomeWallet[] = [
    {
      id: "cash",
      label: t("home.walletCash"),
      value: t("home.cashValue", { amount: CASH_TOMAN }),
      hint: t("home.cashHint"),
    },
    {
      id: "gold",
      label: t("home.walletGold"),
      value: t("home.goldVaultValue", { amount: VAULT_SOT }),
      hint: t("home.goldOunces", { amount: "12.50" }),
    },
  ]

  const actions: QuickAction[] = [
    {
      label: t("home.actionDeposit"),
      to: "/trade",
      Icon: ArrowDownToLine,
      tileClassName: QUICK_TILE_CLASS,
    },
    {
      label: t("home.actionWithdraw"),
      to: "/profile",
      Icon: ArrowUpFromLine,
      tileClassName: QUICK_TILE_CLASS,
    },
    {
      label: t("home.actionDelivery"),
      to: "/profile",
      Icon: Truck,
      tileClassName: QUICK_TILE_CLASS,
    },
    {
      label: t("home.actionInvoices"),
      to: "/chart",
      Icon: FileText,
      tileClassName: QUICK_TILE_CLASS,
    },
  ]

  const markets: HomeMarketRow[] = assets.map((asset) => {
    const name = t(marketNameKey[asset.symbol] ?? "market.goldSpot")

    return {
      id: asset.symbol,
      name,
      symbol: asset.symbol,
      price: asset.price,
      change: asset.chg,
      onSelect: openChart,
      className: "flex w-full items-center justify-between",
      label: name,
      swipeDirection,
      swipeTheme,
      swipeActions: [
        {
          id: "chart",
          label: t("home.swipeChart"),
          color: "#16a34a",
          onSelect: openChart,
        },
      ],
    }
  })

  const activity: HomeActivityRow[] = recentActivity
    .map((row, index) => {
      const id = `${row.date}-${index}`
      const isBuy = row.type === "BUY"
      const sideLabel = isBuy ? t("home.buyGoldAction") : t("home.sellGoldAction")

      const onCommit = (_action: SwipeAction) => {
        setHiddenActivityIds((current) => [...current, id])
        toast.success(t("home.toastActivityRemoved"))
      }

      return {
        id,
        sideLabel,
        sideColor: isBuy ? ("success" as const) : ("danger" as const),
        date: row.date,
        ouncesLabel: `${row.oz} oz`,
        priceLabel: `$${fmt(row.price)}`,
        className: "flex w-full items-center justify-between",
        label: sideLabel,
        swipeDirection,
        swipeTheme,
        swipeActions: [
          {
            id: "delete",
            label: t("options.remove"),
            dismiss: true,
          },
        ],
        onCommit,
      }
    })
    .filter((row) => !hiddenActivityIds.includes(row.id))

  return {
    t,
    header,
    quote,
    tradeActions,
    wallets,
    actions,
    markets,
    activity,
  }
}

export { useHome }
