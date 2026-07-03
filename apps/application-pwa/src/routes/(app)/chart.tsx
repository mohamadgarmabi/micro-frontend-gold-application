import { createFileRoute } from '@tanstack/react-router'
import ChartView from '#/modules/chart/views/chart-view'

export const Route = createFileRoute('/(app)/chart')({
  component: ChartView,
})
