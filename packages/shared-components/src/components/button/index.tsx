import { Button as BaseButton } from '@base-ui/react/button';
import { mergeClassName } from '../../lib/cn';
import { Spinner } from '../../lib/spinner';
import type { ButtonProps } from './button.type';
import { useButton } from './button.hook';
import { buttonClassName } from './button.styles';

function Button({
  className,
  leftIcon,
  rightIcon,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const { isDisabled } = useButton({ disabled, loading, leftIcon, rightIcon, children, ...props });

  return (
    <BaseButton
      className={mergeClassName(buttonClassName, className)}
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
export type { ButtonProps };
