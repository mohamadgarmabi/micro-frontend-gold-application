import Switch from '@gold/shared-components/switch'
import type { ToggleProps } from '../types'

function Toggle({ value, onChange }: ToggleProps) {
  return <Switch checked={value} onCheckedChange={onChange} />
}

export default Toggle
