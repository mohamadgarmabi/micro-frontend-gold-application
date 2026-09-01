import type { MouseEvent } from 'react'
import { Button as HeroButton } from '@heroui/react/button'
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
  isDisabled,
  children,
  size = 'md',
  onClick,
  onPress,
  ...props
}: ButtonProps) => {
  const { isDisabled: hookDisabled } = useButton({
    disabled: disabled ?? isDisabled,
    loading,
    leftIcon,
    rightIcon,
    children,
    size,
    ...props,
  })
  const iconClassName = buttonIconClassName({ size })

  const handlePress: ButtonProps['onPress'] = (event) => {
    onPress?.(event)
    if (onClick) {
      onClick(event as unknown as MouseEvent<HTMLButtonElement>)
    }
  }

  return (
    <HeroButton
      className={mergeClassName(buttonClassName({ size }), className)}
      isDisabled={hookDisabled}
      size={size}
      onPress={handlePress}
      {...props}
    >
      {loading ? (
        <Spinner className={iconClassName} />
      ) : (
        leftIcon && <span className={iconClassName}>{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && <span className={iconClassName}>{rightIcon}</span>}
    </HeroButton>
  )
}

export default Button
export type { ButtonProps, ButtonSize } from './button.type'
