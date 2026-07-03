import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { mergeClassName } from '../../lib/cn';
import type { ToggleProps } from './toggle.type';
import { toggleClassName } from './toggle.styles';

function Toggle({ className, ...props }: ToggleProps) {
  return (
    <BaseToggle
      className={mergeClassName(toggleClassName, className)}
      {...props}
    />
  );
}

export default Toggle;
export type { ToggleProps };
