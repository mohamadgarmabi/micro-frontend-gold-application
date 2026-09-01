import type { CheckboxRootProps } from '@heroui/react/checkbox'

type CheckboxProps = CheckboxRootProps & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export type { CheckboxProps }
