import type { FormFieldDefinition, FormFieldType, FormSchema } from '../types'

const defineFormField = <const TName extends string, const TType extends FormFieldType>(
  field: FormFieldDefinition<TName, TType>,
) => {
  return field
}

const defineFormSchema = <const T extends FormSchema>(schema: T): T => {
  return schema
}

export { defineFormField, defineFormSchema }
