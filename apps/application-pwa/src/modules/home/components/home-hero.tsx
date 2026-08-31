import { cn, Flex } from '@gold/shared-components'
import Typography from '@gold/shared-components/typography'
import Card from '#/modules/shell/components/card'
import GoldBadge from '#/modules/shell/components/gold-badge'
import PriceTag from '#/modules/shell/components/price-tag'
import type { HomeHeroProps } from '../types'

const HomeHero = ({ quote, tradeActions }: HomeHeroProps) => {
  return (
    <Card className="space-y-4 p-5 aurum-spot-card">
      <div className="flex justify-between items-start gap-3">
        <div>
          <Typography as="p" size="xs" color="subtle" className="uppercase tracking-widest">
            {quote.eyebrow}
          </Typography>
          <Typography as="h2" size="md" weight="semibold" className="mt-1">
            {quote.pairLabel}
          </Typography>
        </div>
        <GoldBadge>{quote.liveLabel}</GoldBadge>
      </div>
      <PriceTag value={quote.price} change={quote.change} size="lg" />
      <button type="button" onClick={quote.onOpenChart} className="font-medium text-brand text-xs">
        {quote.chartLabel}
      </button>
      <Flex gap={2} justify="center" align="center">
        {tradeActions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onSelect}
            className={cn(action.className, 'text-center')}
          >
            {action.label}
          </button>
        ))}
      </Flex>
    </Card>
  )
}

export default HomeHero
