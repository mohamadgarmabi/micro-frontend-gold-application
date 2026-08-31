import { mergeClassName } from '../../lib/cn'
import type { CardProps } from './card.type'
import { cardStyles } from './card.styles'

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div className={mergeClassName(cardStyles(), className)} {...props}>
      {children}
    </div>
  )
}

export default Card
export type { CardProps }
