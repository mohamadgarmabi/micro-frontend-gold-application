import SharedCard from "@gold/shared-components/card"
import { Glass } from "glisse"
import { useShellCard } from "../hooks/card.hook"
import type { CardProps } from "../types"

const Card = (props: CardProps) => {
  const { children, className } = useShellCard(props)

  return (
    <Glass className="rounded-xl">
      <SharedCard className={className}>{children}</SharedCard>
    </Glass>
  )
}

export default Card
