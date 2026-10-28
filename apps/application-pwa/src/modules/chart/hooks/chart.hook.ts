import { areaY, crosshair, defineChart, lineY } from "@tanstack/charts"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { tooltip } from "@tanstack/charts/tooltip"
import type { TabBarItem } from "glisse"
import { useState } from "react"
import { monthData, priceData, weekData } from "#/modules/market/utils/data"
import { fmt } from "#/modules/market/utils/format"
import { useDirection } from "#/modules/shell/hooks/direction.hook"
import { useI18n } from "#/modules/shell/hooks/i18n.hook"
import type { MessageKey } from "#/modules/shell/types"
import type { ChartRange, ChartStat, OrderBookRow } from "../types"

const ranges: ChartRange[] = ["1D", "1W", "1M"]

const dataMap = { "1D": priceData, "1W": weekData, "1M": monthData }

const weekdayKeys: Record<string, MessageKey> = {
  Mon: "chart.mon",
  Tue: "chart.tue",
  Wed: "chart.wed",
  Thu: "chart.thu",
  Fri: "chart.fri",
  Sat: "chart.sat",
  Sun: "chart.sun",
}

const useChart = () => {
  const { t } = useI18n()
  const { isRtl } = useDirection()
  const [range, setRange] = useState<ChartRange>("1D")
  const data = dataMap[range]
  const latest = data[data.length - 1].price
  const first = data[0].price
  const chgPct = ((latest - first) / first) * 100
  const up = chgPct >= 0
  // Theme-aware tokens from styles.css; the raw accent is too pale for a line on the light theme.
  const chartStroke = up ? "var(--chart-up)" : "var(--chart-down)"
  const prices = data.map((point) => point.price)
  const high = Math.max(...prices)
  const low = Math.min(...prices)

  const handleRangeChange = (value: string) => {
    setRange(value as ChartRange)
  }

  const chartData = data.map((point) => ({
    ...point,
    time: weekdayKeys[point.time] ? t(weekdayKeys[point.time]) : point.time,
  }))

  const chartDefinition = defineChart({
    marks: [
      areaY(chartData, {
        x: "time",
        y1: low,
        y2: "price",
        fill: "url(#gold-chart-fill)",
        fillOpacity: 1,
      }),
      lineY(chartData, { x: "time", y: "price", stroke: chartStroke, strokeWidth: 2 }),
      crosshair({ y: false }),
    ],
    scales: {
      x: {
        scale: () => scalePoint<string>(),
        axis: { line: false, ticks: { size: 0 } },
      },
      y: {
        scale: scaleLinear,
        nice: true,
        grid: true,
        side: isRtl ? "right" : "left",
        axis: {
          line: false,
          ticks: { size: 0, format: (value: number) => `$${(value / 1000).toFixed(2)}k` },
        },
      },
    },
    gradients: [
      {
        id: "gold-chart-fill",
        x1: 0,
        y1: 1,
        x2: 0,
        y2: 0,
        stops: [
          { offset: 0, color: chartStroke, opacity: 0 },
          { offset: 1, color: chartStroke, opacity: 0.28 },
        ],
      },
    ],
    focus: "nearest-x",
    maxFocusDistance: Number.POSITIVE_INFINITY,
    tooltip: {
      use: tooltip,
      items: [
        { channel: "y", label: t("chart.price"), text: (point) => `$${fmt(point.yValue)}` },
        { channel: "x", label: t("chart.time") },
      ],
    },
  })

  const stats: ChartStat[] = [
    { label: t("chart.open"), value: `$${fmt(first)}` },
    { label: t("chart.high"), value: `$${fmt(high)}` },
    { label: t("chart.low"), value: `$${fmt(low)}` },
    { label: t("chart.volume"), value: t("chart.volumeValue") },
  ]

  const bids: OrderBookRow[] = [3302.1, 3301.8, 3301.4, 3301.0].map((price, index) => ({
    price: fmt(price),
    size: (2.5 - index * 0.4).toFixed(1),
  }))

  const asks: OrderBookRow[] = [3302.45, 3302.8, 3303.2, 3303.6].map((price, index) => ({
    price: fmt(price),
    size: (1.8 + index * 0.3).toFixed(1),
  }))

  const rangeItems: TabBarItem[] = ranges.map((item) => ({ value: item, label: item }))

  return {
    t,
    range,
    // Glisse only lays tabs out left to right, so RTL reverses the order instead.
    rangeItems: isRtl ? [...rangeItems].reverse() : rangeItems,
    handleRangeChange,
    chartDefinition,
    chartLabel: t("chart.ariaLabel", { range }),
    latest,
    chgPct,
    stats,
    bids,
    asks,
  }
}

export { useChart }
