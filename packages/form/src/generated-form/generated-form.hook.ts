import { useForm, useStore } from '@tanstack/react-form'
import type { FormEvent } from 'react'
import { buildDefaultValues } from '../build-default-values'
import type { FormSchema, InferFormValues } from '../types'
import type { GeneratedFormProps } from './generated-form.type'

const useGeneratedForm = <T extends FormSchema>({
  fields,
  defaultValues,
  onSubmit,
  footerButtons,
}: GeneratedFormProps<T>) => {
  const form = useForm({
    defaultValues: {
      ...buildDefaultValues(fields),
      ...defaultValues,
    } as InferFormValues<T>,
    onSubmit: async ({ value }) => {
      await onSubmit(value as InferFormValues<T>)
    },
  })

  const isSubmitting = useStore(form.store, (state) => state.isSubmitting)

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    void form.handleSubmit()
  }

  const cancelButton = footerButtons?.cancel
    ? {
        ...footerButtons.cancel,
        type: 'button' as const,
        disabled: footerButtons.cancel.disabled ?? isSubmitting,
      }
    : undefined

  const submitButton = footerButtons?.submit
    ? {
        ...footerButtons.submit,
        type: 'submit' as const,
        loading: footerButtons.submit.loading ?? isSubmitting,
      }
    : undefined

  return { form, handleFormSubmit, cancelButton, submitButton }
}

export { useGeneratedForm }
