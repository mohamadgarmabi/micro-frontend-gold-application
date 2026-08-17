import Switch from '@gold/shared-components/switch'
import type { ToggleProps } from '../types'

const Toggle = ({ value, onChange, disabled }: ToggleProps) => {
  return <Switch checked={value} onCheckedChange={onChange} disabled={disabled} />
}

export default Toggle
