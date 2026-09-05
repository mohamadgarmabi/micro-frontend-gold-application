import Button from '@gold/shared-components/button'
import Typography from '@gold/shared-components/typography'
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
