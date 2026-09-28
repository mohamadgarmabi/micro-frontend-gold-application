import Chip from "@gold/shared-components/chip"
import type { GoldBadgeProps } from "../types"

const GoldBadge = ({ children, className, color = "success" }: GoldBadgeProps) => {
  return (
    <Chip size="sm" variant="soft" color={color} className={className}>
      {children}
    </Chip>
  )
}

export default GoldBadge
