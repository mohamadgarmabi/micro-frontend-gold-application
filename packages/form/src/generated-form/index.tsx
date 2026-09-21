import Button from "@gold/shared-components/button"
import Checkbox from "@gold/shared-components/checkbox"
import Input from "@gold/shared-components/input"
import type { InputSize } from "@gold/shared-components/input"
import type { FormFieldDefinition, FormFieldValue, FormSchema, InferFormValues } from "../types"
import type { GeneratedFormProps } from "./generated-form.type"
import { useGeneratedForm } from "./generated-form.hook"
import { generatedFormFooterStyles, generatedFormStyles } from "./generated-form.styles"

const renderField = <TName extends string, TType extends FormFieldDefinition<TName>["type"]>(
  field: FormFieldDefinition<TName, TType>,
  value: FormFieldValue<TType>,
  onChange: (next: FormFieldValue<TType>) => void,
  error: string | undefined,
  inputSize: InputSize,
) => {
  if (field.type === "checkbox") {
    return (
      <label className="text-foreground-muted flex items-center gap-2 text-sm">
        <Checkbox
          checked={Boolean(value)}
          onCheckedChange={(checked) => onChange(Boolean(checked) as FormFieldValue<TType>)}
        />
        {field.label}
      </label>
    )
  }

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-foreground text-sm font-medium">{field.label}</span>
      <Input
        name={field.name}
        type={field.type}
        placeholder={field.placeholder}
        value={String(value ?? "")}
        onValueChange={(next) => onChange(next as FormFieldValue<TType>)}
        leftIcon={field.leftIcon}
        rightIcon={field.rightIcon}
        error={Boolean(error)}
        errorMessage={error}
        size={inputSize}
      />
    </label>
  )
}

const GeneratedForm = <T extends FormSchema>(props: GeneratedFormProps<T>) => {
  const { fields, className } = props
  const { form, handleFormSubmit, cancelButton, submitButton, inputSize, createRequiredValidator } =
    useGeneratedForm(props)

  return (
    <form className={className ?? generatedFormStyles()} onSubmit={handleFormSubmit}>
      {fields.map((field) => (
        <form.Field
          key={field.name}
          name={field.name as keyof InferFormValues<T> & string}
          validators={{
            onChange: createRequiredValidator(field),
          }}
        >
          {(fieldApi) =>
            renderField(
              field,
              fieldApi.state.value as FormFieldValue<typeof field.type>,
              (next) => fieldApi.handleChange(next as never),
              fieldApi.state.meta.errors[0],
              inputSize,
            )
          }
        </form.Field>
      ))}

      {(cancelButton || submitButton) && (
        <div className={generatedFormFooterStyles()}>
          {cancelButton ? <Button {...cancelButton} /> : null}
          {submitButton ? <Button {...submitButton} /> : null}
        </div>
      )}
    </form>
  )
}

export default GeneratedForm
export type {
  GeneratedFormProps,
  GeneratedFormSizes,
  FooterButtons,
  FormatRequiredError,
} from "./generated-form.type"
