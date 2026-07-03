import { Button as BaseButton } from '@base-ui/react/button';
import type { ComponentProps, ReactNode } from 'react';

type ButtonProps = ComponentProps<typeof BaseButton> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
};

export type { ButtonProps };
