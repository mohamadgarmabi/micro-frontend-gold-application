import { Input as BaseInput } from '@base-ui/react/input';
import { cn, mergeClassName } from '../../lib/cn';
import type { InputProps } from './input.type';
import { useInput } from './input.hook';
import { inputStyles } from './input.styles';

function Input({
  className,
  leftIcon,
  rightIcon,
  error = false,
  errorMessage,
  id,
  ...props
}: InputProps) {
  const { inputId, errorDescribedBy } = useInput({
    id,
    name: props.name,
    error,
    errorMessage,
    leftIcon,
    rightIcon,
    className,
    ...props,
  });

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className={inputStyles.wrapper}>
        {leftIcon && (
          <span
            className={cn(inputStyles.iconSlot, inputStyles.iconLeft)}
            aria-hidden
          >
            <span className="[&_svg]:size-4">{leftIcon}</span>
          </span>
        )}

        <BaseInput
          id={inputId}
          className={mergeClassName(
            cn(
              inputStyles.base,
              leftIcon ? inputStyles.withLeftIcon : undefined,
              rightIcon ? inputStyles.withRightIcon : undefined,
              error ? inputStyles.error : undefined,
            ),
            className,
          )}
          aria-invalid={error || undefined}
          aria-describedby={errorDescribedBy}
          {...props}
        />

        {rightIcon && (
          <span
            className={cn(inputStyles.iconSlot, inputStyles.iconRight)}
            aria-hidden
          >
            <span className="[&_svg]:size-4">{rightIcon}</span>
          </span>
        )}
      </div>

      {error && errorMessage && (
        <p id={inputId ? `${inputId}-error` : undefined} className={inputStyles.errorText}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default Input;
export type { InputProps };
