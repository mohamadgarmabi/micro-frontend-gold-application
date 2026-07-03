import { mergeClassName } from '../../lib/cn';
import type { BadgeProps, BadgeVariant } from './badge.type';
import { useBadge } from './badge.hook';

function Badge({ children, className, variant = 'brand', ...props }: BadgeProps) {
  const { className: variantClassName } = useBadge({ variant });

  return (
    <span className={mergeClassName(variantClassName, className)} {...props}>
      {children}
    </span>
  );
}

export default Badge;
export type { BadgeProps, BadgeVariant };
