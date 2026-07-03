import type { BadgeVariant } from './badge.type';

const badgeVariantClassName: Record<BadgeVariant, string> = {
  default:
    'inline-flex items-center gap-1 rounded-full bg-gold-200 px-2 py-0.5 font-mono text-xs font-medium text-gold-800',
  brand:
    'inline-flex items-center gap-1 rounded-full border border-gold-600/20 bg-gold-600/10 px-2 py-0.5 font-mono text-xs font-medium text-gold-600',
  success:
    'inline-flex items-center gap-1 rounded-full border border-success/20 bg-success-muted px-2 py-0.5 font-mono text-xs font-medium text-success',
  danger:
    'inline-flex items-center gap-1 rounded-full border border-danger/20 bg-danger-muted px-2 py-0.5 font-mono text-xs font-medium text-danger',
};

export { badgeVariantClassName };
