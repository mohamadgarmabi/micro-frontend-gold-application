import { Form as BaseForm } from '@base-ui/react/form';
import { mergeClassName } from '../../lib/cn';
import type { FormProps } from './form.type';
import { formClassName } from './form.styles';

function Form({ className, ...props }: FormProps) {
  return (
    <BaseForm
      className={mergeClassName(formClassName, className)}
      {...props}
    />
  );
}

export default Form;
export type { FormProps };
