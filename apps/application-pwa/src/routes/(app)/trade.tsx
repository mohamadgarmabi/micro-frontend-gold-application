import { createFileRoute } from "@tanstack/react-router"
import type { TradeSide } from "#/modules/trade/types"
import TradeView from "#/modules/trade/views/trade-view"

export const Route = createFileRoute("/(app)/trade")({
  validateSearch: (search: Record<string, unknown>): { side?: TradeSide } => ({
    side: search.side === "sell" ? "sell" : undefined,
  }),
  component: TradeView,
})
