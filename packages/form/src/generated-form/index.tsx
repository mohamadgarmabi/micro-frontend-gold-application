import Button from '@gold/shared-components/button';
import Checkbox from '@gold/shared-components/checkbox';
import Input from '@gold/shared-components/input';
import type {
  FormFieldDefinition,
  FormFieldValue,
  FormSchema,
  InferFormValues,
} from '../types';
import type { GeneratedFormProps } from './generated-form.type';
import { useGeneratedForm } from './generated-form.hook';
import { generatedFormClassName } from './generated-form.styles';

function renderField<
  TName extends string,
  TType extends FormFieldDefinition<TName>['type'],
>(
  field: FormFieldDefinition<TName, TType>,
  value: FormFieldValue<TType>,
  onChange: (next: FormFieldValue<TType>) => void,
  error?: string,
) {
  if (field.type === 'checkbox') {
    return (
      <label className="flex items-center gap-2 text-sm text-foreground-muted">
        <Checkbox
          checked={Boolean(value)}
          onCheckedChange={(checked) =>
            onChange(Boolean(checked) as FormFieldValue<TType>)
          }
        />
        {field.label}
      </label>
    );
  }

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{field.label}</span>
      <Input
        name={field.name}
        type={field.type}
        placeholder={field.placeholder}
        value={String(value ?? '')}
        onValueChange={(next) => onChange(next as FormFieldValue<TType>)}
        leftIcon={field.leftIcon}
        rightIcon={field.rightIcon}
        error={Boolean(error)}
        errorMessage={error}
      />
    </label>
  );
}

function GeneratedForm<T extends FormSchema>({
  fields,
  defaultValues,
  submitLabel = 'Submit',
  className,
  onSubmit,
}: GeneratedFormProps<T>) {
  const form = useGeneratedForm({ fields, defaultValues, onSubmit });

  return (
    <form
      className={className ?? generatedFormClassName}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      {fields.map((field) => (
        <form.Field
          key={field.name}
          name={field.name as keyof InferFormValues<T> & string}
          validators={{
            onChange: ({ value }) => {
              if (!field.required) return undefined;
              if (field.type === 'checkbox') {
                return value ? undefined : `${field.label} is required`;
              }
              return String(value ?? '').trim()
                ? undefined
                : `${field.label} is required`;
            },
          }}
        >
          {(fieldApi) =>
            renderField(
              field,
              fieldApi.state.value as FormFieldValue<typeof field.type>,
              (next) => fieldApi.handleChange(next as never),
              fieldApi.state.meta.errors[0],
            )
          }
        </form.Field>
      ))}

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button type="submit" loading={isSubmitting}>
            {submitLabel}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}

export default GeneratedForm;
export type { GeneratedFormProps };
