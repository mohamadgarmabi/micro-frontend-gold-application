import Button from '@gold/shared-components/button'
import { Hexagon, TrendingUp } from 'lucide-react'
import type { HomeHeaderModel } from '../types'

const HomeHeader = ({ greeting, brandName, onOpenChart }: HomeHeaderModel) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <span className="flex justify-center items-center bg-accent shadow-sm rounded-[var(--radius)] size-11 text-accent-foreground">
          <Hexagon size={18} strokeWidth={2.4} />
        </span>
        <div>
          <p className="text-muted text-xs">{greeting}</p>
          <h1 className="font-semibold text-foreground text-lg tracking-tight">{brandName}</h1>
        </div>
      </div>
      <Button
        isIconOnly
        variant="secondary"
        aria-label="Open chart"
        onPress={onOpenChart}
      >
        <TrendingUp size={16} />
      </Button>
    </div>
  )
}

export default HomeHeader
