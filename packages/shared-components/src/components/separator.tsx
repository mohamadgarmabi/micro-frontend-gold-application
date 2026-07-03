import { Separator as BaseSeparator } from '@base-ui/react/separator';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../lib/cn';
import { singleComponentStyles } from '../lib/styles';

export type SeparatorProps = ComponentProps<typeof BaseSeparator>;

export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <BaseSeparator
      className={mergeClassName(singleComponentStyles.Separator, className)}
      {...props}
    />
  );
}

export default Separator;
