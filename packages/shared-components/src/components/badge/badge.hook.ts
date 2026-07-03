import type { BadgeProps } from './badge.type';
import { badgeVariantClassName } from './badge.styles';

function useBadge({ variant = 'brand' }: Pick<BadgeProps, 'variant'>) {
  return { className: badgeVariantClassName[variant] };
}

export { useBadge };
