import { useForm } from '@tanstack/react-form';
import { buildDefaultValues } from '../build-default-values';
import type { FormSchema, InferFormValues } from '../types';
import type { GeneratedFormProps } from './generated-form.type';

function useGeneratedForm<T extends FormSchema>({
  fields,
  defaultValues,
  onSubmit,
}: Pick<GeneratedFormProps<T>, 'fields' | 'defaultValues' | 'onSubmit'>) {
  return useForm({
    defaultValues: {
      ...buildDefaultValues(fields),
      ...defaultValues,
    } as InferFormValues<T>,
    onSubmit: async ({ value }) => {
      await onSubmit(value as InferFormValues<T>);
    },
  });
}

export { useGeneratedForm };
