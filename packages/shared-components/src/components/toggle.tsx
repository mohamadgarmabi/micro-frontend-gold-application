import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../lib/cn';
import { singleComponentStyles } from '../lib/styles';

export type ToggleProps = ComponentProps<typeof BaseToggle>;

export function Toggle({ className, ...props }: ToggleProps) {
  return (
    <BaseToggle
      className={mergeClassName(singleComponentStyles.Toggle, className)}
      {...props}
    />
  );
}

export default Toggle;
