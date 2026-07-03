import { Form as BaseForm } from '@base-ui/react/form';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../lib/cn';
import { singleComponentStyles } from '../lib/styles';

export type FormProps = ComponentProps<typeof BaseForm>;

export function Form({ className, ...props }: FormProps) {
  return (
    <BaseForm
      className={mergeClassName(singleComponentStyles.Form, className)}
      {...props}
    />
  );
}

export default Form;
