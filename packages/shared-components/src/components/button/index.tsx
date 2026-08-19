import { Button as BaseButton } from '@base-ui/react/button'
import { mergeClassName } from '../../lib/cn'
import { Spinner } from '../../lib/spinner'
import type { ButtonProps } from './button.type'
import { useButton } from './button.hook'
import { buttonClassName, buttonIconClassName } from './button.styles'

const Button = ({
  className,
  leftIcon,
  rightIcon,
  loading = false,
  disabled,
  children,
  size = 'md',
  ...props
}: ButtonProps) => {
  const { isDisabled } = useButton({
    disabled,
    loading,
    leftIcon,
    rightIcon,
    children,
    size,
    ...props,
  })
  const iconClassName = buttonIconClassName({ size })

  return (
    <BaseButton
      className={mergeClassName(buttonClassName({ size }), className)}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <Spinner className={iconClassName} />
      ) : (
        leftIcon && <span className={iconClassName}>{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && <span className={iconClassName}>{rightIcon}</span>}
    </BaseButton>
  )
}

export default Button
export type { ButtonProps, ButtonSize } from './button.type'
