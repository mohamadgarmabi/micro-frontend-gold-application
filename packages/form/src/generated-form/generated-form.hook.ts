import { useForm, useStore } from "@tanstack/react-form"
import type { FormEvent } from "react"
import { buildDefaultValues } from "../build-default-values"
import type { FormFieldDefinition, FormSchema, InferFormValues } from "../types"
import type { FormatRequiredError, GeneratedFormProps } from "./generated-form.type"

const defaultRequiredError: FormatRequiredError = (label) => `${label} is required`

const useGeneratedForm = <T extends FormSchema>({
  fields,
  defaultValues,
  onSubmit,
  footerButtons,
  sizes,
  formatRequiredError = defaultRequiredError,
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
  const inputSize = sizes?.input ?? "md"
  const buttonSize = sizes?.button ?? "md"

  const createRequiredValidator = (field: FormFieldDefinition) => {
    return ({ value }: { value: unknown }) => {
      if (!field.required) {
        return undefined
      }

      if (field.type === "checkbox") {
        return value ? undefined : formatRequiredError(field.label)
      }

      return String(value ?? "").trim() ? undefined : formatRequiredError(field.label)
    }
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    void form.handleSubmit()
  }

  const cancelButton = footerButtons?.cancel
    ? {
        ...footerButtons.cancel,
        type: "button" as const,
        size: footerButtons.cancel.size ?? buttonSize,
        disabled: footerButtons.cancel.disabled ?? isSubmitting,
      }
    : undefined

  const submitButton = footerButtons?.submit
    ? {
        ...footerButtons.submit,
        type: "submit" as const,
        size: footerButtons.submit.size ?? buttonSize,
        loading: footerButtons.submit.loading ?? isSubmitting,
      }
    : undefined

  return {
    form,
    handleFormSubmit,
    cancelButton,
    submitButton,
    inputSize,
    createRequiredValidator,
  }
}

export { useGeneratedForm }
