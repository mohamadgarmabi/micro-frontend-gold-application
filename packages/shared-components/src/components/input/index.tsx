import { Input as BaseInput } from '@base-ui/react/input'
import { cn, mergeClassName } from '../../lib/cn'
import { useInput } from './input.hook'
import { inputStyles } from './input.styles'
import type { InputProps } from './input.type'

const Input = (props: InputProps) => {
  const {
    className,
    leftIcon,
    rightIcon,
    error = false,
    errorMessage,
    size = 'md',
    ...rest
  } = props
  const {
    inputId,
    errorDescribedBy,
    type,
    inputMode,
    dir,
    hasEndAdornment,
    revealToggle,
    value,
    defaultValue,
    onChange,
    onValueChange,
  } = useInput(props)

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className={inputStyles.wrapper()}>
        {leftIcon && (
          <span className={cn(inputStyles.iconSlot(), inputStyles.iconLeft())} aria-hidden>
            <span className={inputStyles.icon({ size })}>{leftIcon}</span>
          </span>
        )}

        <BaseInput
          {...rest}
          id={inputId}
          type={type}
          inputMode={inputMode}
          dir={dir}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onValueChange={onValueChange}
          className={mergeClassName(
            cn(
              inputStyles.base({ size }),
              leftIcon ? inputStyles.withLeftIcon({ size }) : undefined,
              hasEndAdornment ? inputStyles.withRightIcon({ size }) : undefined,
              error ? inputStyles.error() : undefined,
            ),
            className,
          )}
          aria-invalid={error || undefined}
          aria-describedby={errorDescribedBy}
        />

        {revealToggle ? (
          <button
            type="button"
            className={revealToggle.className}
            onClick={revealToggle.onClick}
            aria-label={revealToggle.label}
            aria-pressed={revealToggle.pressed}
          >
            {revealToggle.icon}
          </button>
        ) : null}

        {!revealToggle && rightIcon ? (
          <span className={cn(inputStyles.iconSlot(), inputStyles.iconRight())} aria-hidden>
            <span className={inputStyles.icon({ size })}>{rightIcon}</span>
          </span>
        ) : null}
      </div>

      {error && errorMessage && (
        <p id={inputId ? `${inputId}-error` : undefined} className={inputStyles.errorText()}>
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default Input
export type { InputProps, InputSize } from './input.type'
