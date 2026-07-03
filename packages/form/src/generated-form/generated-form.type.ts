import type {
  FormFieldDefinition,
  FormFieldValue,
  FormSchema,
  InferFormValues,
} from '../types';

type GeneratedFormProps<T extends FormSchema> = {
  fields: T;
  defaultValues?: Partial<InferFormValues<T>>;
  submitLabel?: string;
  className?: string;
  onSubmit: (values: InferFormValues<T>) => void | Promise<void>;
};

export type { GeneratedFormProps, FormFieldDefinition, FormFieldValue };
