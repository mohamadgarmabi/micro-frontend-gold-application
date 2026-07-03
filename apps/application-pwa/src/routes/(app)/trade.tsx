import { createFileRoute } from '@tanstack/react-router'
import TradeView from '#/modules/trade/views/trade-view'

export const Route = createFileRoute('/(app)/trade')({
  component: TradeView,
})
