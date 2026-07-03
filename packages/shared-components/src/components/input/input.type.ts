import { Input as BaseInput } from '@base-ui/react/input';
import type { ComponentProps, ReactNode } from 'react';

type InputProps = ComponentProps<typeof BaseInput> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
  errorMessage?: string;
};

export type { InputProps };
