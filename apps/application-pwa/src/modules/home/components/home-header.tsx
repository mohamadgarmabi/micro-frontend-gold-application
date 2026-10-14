import Button from "@gold/shared-components/button"
import Typography from "@gold/shared-components/typography"
import { Hexagon, TrendingUp } from "lucide-react"
import type { HomeHeaderModel } from "../types"

const HomeHeader = ({ greeting, brandName, onOpenChart }: HomeHeaderModel) => {
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
      <Button isIconOnly variant="secondary" aria-label="Open chart" onPress={onOpenChart}>
        <TrendingUp size={16} />
      </Button>
    </div>
  )
}

export default HomeHeader
