import { Checkbox as HeroCheckbox } from '@heroui/react/checkbox'
import type { CheckboxProps } from './checkbox.type'

const Checkbox = ({
  checked,
  onCheckedChange,
  isSelected,
  onChange,
  ...props
}: CheckboxProps) => {
  const selected = isSelected ?? checked
  const handleChange: CheckboxProps['onChange'] = (value) => {
    onChange?.(value)
    onCheckedChange?.(Boolean(value))
  }

  return (
    <HeroCheckbox isSelected={selected} onChange={handleChange} {...props} />
  )
}

export default Checkbox
export type { CheckboxProps } from './checkbox.type'
