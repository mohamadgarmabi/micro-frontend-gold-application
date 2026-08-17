import type { ButtonProps } from '@gold/shared-components/button'
import type { FormFieldDefinition, FormFieldValue, FormSchema, InferFormValues } from '../types'

type FooterButtons = {
  cancel?: ButtonProps
  submit?: ButtonProps
}

type GeneratedFormProps<T extends FormSchema> = {
  fields: T
  defaultValues?: Partial<InferFormValues<T>>
  footerButtons?: FooterButtons
  className?: string
  onSubmit: (values: InferFormValues<T>) => void | Promise<void>
}

export type { GeneratedFormProps, FooterButtons, FormFieldDefinition, FormFieldValue }
