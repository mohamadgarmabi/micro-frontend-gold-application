import Typography from '@gold/shared-components/typography'
import Card from '#/modules/shell/components/card'
import GoldBadge from '#/modules/shell/components/gold-badge'
import PriceTag from '#/modules/shell/components/price-tag'
import type { HomeHeroProps } from '../types'

const HomeHero = ({ quote, tradeActions }: HomeHeroProps) => {
  return (
    <Card className="aurum-spot-card space-y-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Typography as="p" size="xs" color="subtle" className="tracking-widest uppercase">
            {quote.eyebrow}
          </Typography>
          <Typography as="h2" size="md" weight="semibold" className="mt-1">
            {quote.pairLabel}
          </Typography>
        </div>
        <GoldBadge>{quote.liveLabel}</GoldBadge>
      </div>
      <PriceTag value={quote.price} change={quote.change} size="lg" />
      <button type="button" onClick={quote.onOpenChart} className="text-xs font-medium text-brand">
        {quote.chartLabel}
      </button>
      <div className="flex gap-3">
        {tradeActions.map((action) => (
          <button key={action.label} type="button" onClick={action.onSelect} className={action.className}>
            {action.label}
          </button>
        ))}
      </div>
    </Card>
  )
}

export default HomeHero
