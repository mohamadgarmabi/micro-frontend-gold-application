import { Button as BaseButton } from '@base-ui/react/button';
import type { ComponentProps, ReactNode } from 'react';
import { mergeClassName } from '../lib/cn';
import { Spinner } from '../lib/spinner';
import { singleComponentStyles } from '../lib/styles';

export type ButtonProps = ComponentProps<typeof BaseButton> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
};

export function Button({
  className,
  leftIcon,
  rightIcon,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <BaseButton
      className={mergeClassName(singleComponentStyles.Button, className)}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <Spinner className="size-4 shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0 [&_svg]:size-4">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && (
        <span className="shrink-0 [&_svg]:size-4">{rightIcon}</span>
      )}
    </BaseButton>
  );
}

export default Button;
