import type { ButtonProps } from '@gold/shared-components/button'
import type { InputSize } from '@gold/shared-components/input'
import type { FormFieldDefinition, FormFieldValue, FormSchema, InferFormValues } from '../types'

type FooterButtons = {
  cancel?: ButtonProps
  submit?: ButtonProps
}

type GeneratedFormSizes = {
  input?: InputSize
  button?: ButtonProps['size']
}

type GeneratedFormProps<T extends FormSchema> = {
  fields: T
  defaultValues?: Partial<InferFormValues<T>>
  footerButtons?: FooterButtons
  className?: string
  sizes?: GeneratedFormSizes
  onSubmit: (values: InferFormValues<T>) => void | Promise<void>
}

export type {
  GeneratedFormProps,
  GeneratedFormSizes,
  FooterButtons,
  FormFieldDefinition,
  FormFieldValue,
}
