import type { FormFieldDefinition, FormFieldType, FormSchema } from './types';

export function defineFormField<
  const TName extends string,
  const TType extends FormFieldType,
>(field: FormFieldDefinition<TName, TType>) {
  return field;
}

export function defineFormSchema<const T extends FormSchema>(schema: T): T {
  return schema;
}
