import type { HTMLAttributes, ReactNode } from 'react';

type BadgeVariant = 'default' | 'brand' | 'success' | 'danger';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

export type { BadgeProps, BadgeVariant };
