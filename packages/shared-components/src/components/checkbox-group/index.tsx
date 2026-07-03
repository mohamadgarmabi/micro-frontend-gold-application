import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { mergeClassName } from '../../lib/cn';
import type { CheckboxGroupProps } from './checkbox-group.type';
import { checkboxgroupClassName } from './checkbox-group.styles';

function CheckboxGroup({ className, ...props }: CheckboxGroupProps) {
  return (
    <BaseCheckboxGroup
      className={mergeClassName(checkboxgroupClassName, className)}
      {...props}
    />
  );
}

export default CheckboxGroup;
export type { CheckboxGroupProps };
