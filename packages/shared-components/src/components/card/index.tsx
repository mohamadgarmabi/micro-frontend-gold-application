import { mergeClassName } from '../../lib/cn';
import type { CardProps } from './card.type';
import { cardClassName } from './card.styles';

function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={mergeClassName(cardClassName, className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
export type { CardProps };
