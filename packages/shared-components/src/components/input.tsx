import { Input as BaseInput } from '@base-ui/react/input';
import type { ComponentProps, ReactNode } from 'react';
import { cn, mergeClassName } from '../lib/cn';
import { singleComponentStyles, styles } from '../lib/styles';

export type InputProps = ComponentProps<typeof BaseInput> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
  errorMessage?: string;
};

export function Input({
  className,
  leftIcon,
  rightIcon,
  error = false,
  errorMessage,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className={styles.inputWrapper}>
        {leftIcon && (
          <span
            className={cn(styles.inputIconSlot, styles.inputIconLeft)}
            aria-hidden
          >
            <span className="[&_svg]:size-4">{leftIcon}</span>
          </span>
        )}

        <BaseInput
          id={inputId}
          className={mergeClassName(
            cn(
              singleComponentStyles.Input,
              leftIcon ? styles.inputWithLeftIcon : undefined,
              rightIcon ? styles.inputWithRightIcon : undefined,
              error ? styles.inputError : undefined
            ),
            className
          )}
          aria-invalid={error || undefined}
          aria-describedby={
            error && errorMessage && inputId
              ? `${inputId}-error`
              : undefined
          }
          {...props}
        />

        {rightIcon && (
          <span
            className={cn(styles.inputIconSlot, styles.inputIconRight)}
            aria-hidden
          >
            <span className="[&_svg]:size-4">{rightIcon}</span>
          </span>
        )}
      </div>

      {error && errorMessage && (
        <p id={inputId ? `${inputId}-error` : undefined} className={styles.error}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default Input;
