import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../lib/cn';
import { singleComponentStyles } from '../lib/styles';

export type RadioGroupProps = ComponentProps<typeof BaseRadioGroup>;

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      className={mergeClassName(singleComponentStyles.RadioGroup, className)}
      {...props}
    />
  );
}

export default RadioGroup;
