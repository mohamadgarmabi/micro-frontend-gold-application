import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../lib/cn';
import { singleComponentStyles } from '../lib/styles';

export type CheckboxGroupProps = ComponentProps<typeof BaseCheckboxGroup>;

export function CheckboxGroup({ className, ...props }: CheckboxGroupProps) {
  return (
    <BaseCheckboxGroup
      className={mergeClassName(singleComponentStyles.CheckboxGroup, className)}
      {...props}
    />
  );
}

export default CheckboxGroup;
