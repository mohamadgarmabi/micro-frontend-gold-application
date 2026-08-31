import Typography from '@gold/shared-components/typography'
import { Hexagon, TrendingUp } from 'lucide-react'
import type { HomeHeaderModel } from '../types'

const HomeHeader = ({ greeting, brandName, onOpenChart }: HomeHeaderModel) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="aurum-mark flex size-11 items-center justify-center rounded-2xl bg-button text-button-foreground">
          <Hexagon size={18} strokeWidth={2.4} />
        </span>
        <div>
          <Typography as="p" size="xs" color="subtle">
            {greeting}
          </Typography>
          <Typography as="h1" size="lg" weight="semibold" className="tracking-tight">
            {brandName}
          </Typography>
        </div>
      </div>
      <button
        type="button"
        onClick={onOpenChart}
        className="flex size-11 items-center justify-center rounded-full border border-border bg-surface-elevated text-foreground"
      >
        <TrendingUp size={16} />
      </button>
    </div>
  )
}

export default HomeHeader
