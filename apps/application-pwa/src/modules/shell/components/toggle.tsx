import { Switch } from "glisse"
import type { ToggleProps } from "../types"

const Toggle = ({ value, onChange, label, disabled }: ToggleProps) => {
  return (
    <Switch checked={value} onCheckedChange={onChange} disabled={disabled} aria-label={label} />
  )
}

export default Toggle
