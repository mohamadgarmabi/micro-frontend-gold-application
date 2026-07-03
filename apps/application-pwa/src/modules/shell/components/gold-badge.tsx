import Badge from '@gold/shared-components/badge'
import type { GoldBadgeProps } from '../types'

function GoldBadge({ children, className }: GoldBadgeProps) {
  return (
    <Badge variant="brand" className={className}>
      {children}
    </Badge>
  )
}

export default GoldBadge
