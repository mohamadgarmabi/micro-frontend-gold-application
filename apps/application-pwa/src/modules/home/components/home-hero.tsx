import Typography from '@gold/shared-components/typography'
import { Coins } from 'lucide-react'
import type { HomeHeroProps } from '../types'

const HomeHero = ({ hero, gaugeTicks }: HomeHeroProps) => {
  return (
    <section className="aurum-hero-card">
      <Typography as="p" size="xs" color="subtle" align="center">
        {hero.eyebrow}
      </Typography>
      <div className="aurum-gauge">
        {gaugeTicks.map((tick) => (
          <span key={tick.id} className={tick.className} style={tick.style} />
        ))}
        <div className="aurum-gauge__center">
          <Typography as="p" size="xs" color="subtle">
            {hero.caption}
          </Typography>
          <Typography as="p" size="display" weight="bold" className="font-mono tracking-tight">
            {hero.value}
          </Typography>
        </div>
      </div>
      <button type="button" onClick={hero.onToggleAsset} className="aurum-hero-chip">
        <Coins size={14} />
        <Typography as="span" size="xs" weight="semibold">
          {hero.chipLabel}
        </Typography>
        <Typography as="span" size="xs" color="subtle">
          {hero.chipHint}
        </Typography>
      </button>
      <div className="mt-5 flex items-end justify-between gap-3">
        <Typography as="p" size="xs" color="subtle">
          {hero.protocolLabel}
        </Typography>
        <Typography as="p" size="xs" color="subtle">
          {hero.progressLabel}
        </Typography>
      </div>
    </section>
  )
}

export default HomeHero
