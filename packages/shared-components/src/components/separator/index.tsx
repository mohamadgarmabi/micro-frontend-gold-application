import { Separator as BaseSeparator } from '@base-ui/react/separator';
import { mergeClassName } from '../../lib/cn';
import type { SeparatorProps } from './separator.type';
import { separatorClassName } from './separator.styles';

function Separator({ className, ...props }: SeparatorProps) {
  return (
    <BaseSeparator
      className={mergeClassName(separatorClassName, className)}
      {...props}
    />
  );
}

export default Separator;
export type { SeparatorProps };
