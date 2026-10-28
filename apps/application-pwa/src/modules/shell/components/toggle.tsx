import { Switch } from "glisse"
import type { ToggleProps } from "../types"

const Toggle = ({ value, onChange, disabled }: ToggleProps) => {
  return <Switch checked={value} onCheckedChange={onChange} disabled={disabled} />
}

export default Toggle
