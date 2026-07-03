import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { mergeClassName } from '../../lib/cn';
import type { RadioGroupProps } from './radio-group.type';
import { radiogroupClassName } from './radio-group.styles';

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      className={mergeClassName(radiogroupClassName, className)}
      {...props}
    />
  );
}

export default RadioGroup;
export type { RadioGroupProps };
