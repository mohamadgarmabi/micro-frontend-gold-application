import { Switch as HeroSwitch } from '@heroui/react/switch'
import type { SwitchRootProps } from '@heroui/react/switch'

type SwitchProps = SwitchRootProps & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

const Switch = ({
  checked,
  onCheckedChange,
  isSelected,
  onChange,
  disabled,
  isDisabled,
  ...props
}: SwitchProps) => {
  const selected = isSelected ?? checked
  const handleChange: SwitchProps['onChange'] = (value) => {
    onChange?.(value)
    onCheckedChange?.(Boolean(value))
  }

  return (
    <HeroSwitch
      isSelected={selected}
      onChange={handleChange}
      isDisabled={isDisabled ?? disabled}
      {...props}
    />
  )
}

export default Switch
export type { SwitchProps }
