import type { BadgeProps } from './badge.type'
import { badgeStyles } from './badge.styles'

const useBadge = ({ variant = 'brand' }: Pick<BadgeProps, 'variant'>) => {
  return { className: badgeStyles({ variant }) }
}

export { useBadge }
