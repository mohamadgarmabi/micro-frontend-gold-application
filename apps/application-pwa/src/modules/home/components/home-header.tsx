import Typography from "@gold/shared-components/typography"
import { Button } from "glisse"
import { Hexagon, TrendingUp } from "lucide-react"
import type { HomeHeaderModel } from "../types"

const HomeHeader = ({ greeting, brandName, chartLabel, onOpenChart }: HomeHeaderModel) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="bg-accent text-accent-foreground flex size-11 items-center justify-center rounded-[var(--radius)] shadow-sm">
          <Hexagon size={18} strokeWidth={2.4} />
        </span>
        <div>
          <Typography size="xs" weight="regular" color="muted">
            {greeting}
          </Typography>
          <Typography as="h1" size="lg" weight="semibold" className="tracking-tight">
            {brandName}
          </Typography>
        </div>
      </div>
      <Button icon={<TrendingUp size={16} />} aria-label={chartLabel} onClick={onOpenChart} />
    </div>
  )
}

export default HomeHeader
