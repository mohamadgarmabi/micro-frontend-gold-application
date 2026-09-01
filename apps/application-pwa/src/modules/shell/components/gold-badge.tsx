import Chip from '@gold/shared-components/chip'
import type { GoldBadgeProps } from '../types'

const GoldBadge = ({ children, className }: GoldBadgeProps) => {
  return (
    <Chip size="sm" variant="soft" color="success" className={className}>
      {children}
    </Chip>
  )
}

export default GoldBadge
