import type { FormSchema, InferFormValues } from './types';

export function buildDefaultValues<T extends FormSchema>(
  schema: T,
): InferFormValues<T> {
  return Object.fromEntries(
    schema.map((field) => [
      field.name,
      field.type === 'checkbox' ? false : '',
    ]),
  ) as InferFormValues<T>;
}
