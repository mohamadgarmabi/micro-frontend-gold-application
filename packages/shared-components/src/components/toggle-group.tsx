import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../lib/cn';
import { singleComponentStyles } from '../lib/styles';

export type ToggleGroupProps = ComponentProps<typeof BaseToggleGroup>;

export function ToggleGroup({ className, ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      className={mergeClassName(singleComponentStyles.ToggleGroup, className)}
      {...props}
    />
  );
}

export default ToggleGroup;
