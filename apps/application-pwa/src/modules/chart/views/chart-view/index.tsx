import Typography from "@gold/shared-components/typography"
import { Chart } from "@tanstack/charts/react"
import { TabBar } from "glisse"
import Card from "#/modules/shell/components/card"
import GoldBadge from "#/modules/shell/components/gold-badge"
import PriceTag from "#/modules/shell/components/price-tag"
import { useChart } from "../../hooks/chart.hook"

const ChartView = () => {
  const {
    t,
    range,
    rangeItems,
    handleRangeChange,
    chartDefinition,
    chartLabel,
    latest,
    chgPct,
    stats,
    bids,
    asks,
  } = useChart()

  return (
    <div className="min-h-screen pb-24 lg:pb-10">
      <div className="px-5 pt-12 pb-4">
        <div className="mb-1 flex items-center justify-between">
          <div>
            <Typography
              size="xs"
              weight="regular"
              color="subtle"
              className="tracking-widest uppercase"
            >
              {t("chart.goldSpot")}
            </Typography>
            <Typography as="h2" size="xl" weight="semibold" className="aurum-serif">
              XAU / USD
            </Typography>
          </div>
          <GoldBadge>{t("chart.live")}</GoldBadge>
        </div>
        <PriceTag value={latest} change={chgPct} size="lg" />
      </div>

      <div className="mb-4 flex justify-center px-5">
        <TabBar
          dir="ltr"
          items={rangeItems}
          value={range}
          onValueChange={handleRangeChange}
          className="[--lg-tab-width:calc((min(100vw,28rem)-2.5rem-8px)/3)]!"
        />
      </div>

      <div className="mb-6 px-3">
        <Chart
          definition={chartDefinition}
          height={300}
          initialWidth={400}
          ariaLabel={chartLabel}
          className="gold-chart"
        />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 px-5 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="py-3">
            <Typography
              size="xs"
              weight="regular"
              color="subtle"
              className="mb-1 tracking-widest uppercase"
            >
              {stat.label}
            </Typography>
            <Typography size="sm" weight="medium" className="font-mono">
              {stat.value}
            </Typography>
          </Card>
        ))}
      </div>

      <div className="px-5">
        <Card>
          <Typography
            size="xs"
            weight="regular"
            color="subtle"
            className="mb-3 tracking-widest uppercase"
          >
            {t("chart.orderBook")}
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography size="xs" weight="regular" color="success" className="mb-2">
                {t("chart.bids")}
              </Typography>
              {bids.map((row) => (
                <div key={row.price} className="mb-1.5 flex justify-between">
                  <Typography
                    as="span"
                    size="xs"
                    weight="regular"
                    color="success"
                    className="font-mono"
                  >
                    {row.price}
                  </Typography>
                  <Typography
                    as="span"
                    size="xs"
                    weight="regular"
                    color="subtle"
                    className="font-mono"
                  >
                    {row.size}
                  </Typography>
                </div>
              ))}
            </div>
            <div>
              <Typography size="xs" weight="regular" color="danger" className="mb-2">
                {t("chart.asks")}
              </Typography>
              {asks.map((row) => (
                <div key={row.price} className="mb-1.5 flex justify-between">
                  <Typography
                    as="span"
                    size="xs"
                    weight="regular"
                    color="danger"
                    className="font-mono"
                  >
                    {row.price}
                  </Typography>
                  <Typography
                    as="span"
                    size="xs"
                    weight="regular"
                    color="subtle"
                    className="font-mono"
                  >
                    {row.size}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ChartView
