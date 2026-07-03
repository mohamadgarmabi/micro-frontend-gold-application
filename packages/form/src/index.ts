import GeneratedForm from './generated-form';
import { buildDefaultValues } from './build-default-values';
import { defineFormField, defineFormSchema } from './define-form-schema';
import { MailIcon, LockIcon } from './icons';
import { useForm } from '@tanstack/react-form';

export {
  GeneratedForm,
  buildDefaultValues,
  defineFormField,
  defineFormSchema,
  MailIcon,
  LockIcon,
  useForm,
};
export type {
  FormFieldDefinition,
  FormFieldNames,
  FormFieldType,
  FormFieldValue,
  FormSchema,
  InferFormValues,
} from './types';
export type { GeneratedFormProps } from './generated-form';
