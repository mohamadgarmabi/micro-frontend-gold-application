import type { BottomNavLabelProps } from "../types"
import { bottomNavLabelStyles } from "./bottom-nav.styles"

const BottomNavLabel = ({ icon: Icon, label }: BottomNavLabelProps) => {
  return (
    <span className={bottomNavLabelStyles()}>
      <Icon size={20} strokeWidth={2} />
      <span>{label}</span>
    </span>
  )
}

export default BottomNavLabel
