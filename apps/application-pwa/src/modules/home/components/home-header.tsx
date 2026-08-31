import Typography from '@gold/shared-components/typography'
import { Calendar, Flame, Hexagon } from 'lucide-react'
import type { HomeHeaderModel } from '../types'

const HomeHeader = ({ brandName, dateLabel, streakLabel, onOpenCalendar }: HomeHeaderModel) => {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className="aurum-mark flex size-10 items-center justify-center rounded-2xl bg-button text-button-foreground">
          <Hexagon size={18} strokeWidth={2.4} />
        </span>
        <div>
          <Typography as="h1" size="lg" weight="semibold" className="tracking-tight">
            {brandName}
          </Typography>
          <Typography as="p" size="xs" color="subtle">
            {dateLabel}
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Typography
          as="span"
          size="sm"
          weight="semibold"
          className="flex h-10 items-center gap-1 rounded-full border border-border bg-surface-elevated px-3"
        >
          <Flame size={14} className="text-warning" />
          {streakLabel}
        </Typography>
        <button
          type="button"
          onClick={onOpenCalendar}
          className="flex size-10 items-center justify-center rounded-full border border-border bg-surface-elevated text-foreground"
        >
          <Calendar size={16} />
        </button>
      </div>
    </div>
  )
}

export default HomeHeader
