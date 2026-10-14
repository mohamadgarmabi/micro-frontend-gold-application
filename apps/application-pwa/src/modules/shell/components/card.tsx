import SharedCard from "@gold/shared-components/card"
import LiquidGlass from "@gold/shared-components/liquid-glass"
import { useShellCard } from "../hooks/card.hook"
import type { CardProps } from "../types"

const Card = (props: CardProps) => {
  const { children, className } = useShellCard(props)

  return (
    <LiquidGlass cornerRadius={16} className="rounded-xl">
      <SharedCard className={className}>{children}</SharedCard>
    </LiquidGlass>
  )
}

export default Card
