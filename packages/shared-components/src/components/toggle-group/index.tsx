import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { mergeClassName } from '../../lib/cn';
import type { ToggleGroupProps } from './toggle-group.type';
import { togglegroupClassName } from './toggle-group.styles';

function ToggleGroup({ className, ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      className={mergeClassName(togglegroupClassName, className)}
      {...props}
    />
  );
}

export default ToggleGroup;
export type { ToggleGroupProps };
