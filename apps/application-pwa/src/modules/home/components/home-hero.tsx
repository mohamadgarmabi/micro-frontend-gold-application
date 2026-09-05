import Button from '@gold/shared-components/button'
import Card from '@gold/shared-components/card'
import Link from '@gold/shared-components/link'
import Typography from '@gold/shared-components/typography'
import GoldBadge from '#/modules/shell/components/gold-badge'
import PriceTag from '#/modules/shell/components/price-tag'
import type { HomeHeroProps } from '../types'

const HomeHero = ({ quote, tradeActions }: HomeHeroProps) => {
  return (
    <Card className="space-y-4 p-5">
      <div className="flex justify-between items-start gap-3">
        <div>
          <Typography size="xs" weight="regular" color="muted" className="uppercase tracking-widest">
            {quote.eyebrow}
          </Typography>
          <Typography as="h2" size="md" weight="semibold" className="mt-1">
            {quote.pairLabel}
          </Typography>
        </div>
        <GoldBadge>{quote.liveLabel}</GoldBadge>
      </div>
      <PriceTag value={quote.price} change={quote.change} size="lg" />
      <Link className="font-medium text-foreground text-xs" onPress={quote.onOpenChart}>
        {quote.chartLabel}
      </Link>
      <div className="flex justify-center items-center gap-2">
        {tradeActions.map((action) => (
          <Button
            key={action.label}
            type="button"
            variant={action.variant}
            className="flex-1"
            onPress={action.onSelect}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </Card>
  )
}

export default HomeHero
