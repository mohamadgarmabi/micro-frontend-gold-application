import type { ReactNode } from 'react';

type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'checkbox';

type FormFieldValue<TType extends FormFieldType> = TType extends 'checkbox'
  ? boolean
  : string;

type FormFieldDefinition<
  TName extends string = string,
  TType extends FormFieldType = FormFieldType,
> = {
  name: TName;
  type: TType;
  label: string;
  placeholder?: string;
  required?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

type FormSchema = readonly FormFieldDefinition[];

type InferFormValues<T extends FormSchema> = {
  [K in T[number]['name']]: FormFieldValue<
    Extract<T[number], { name: K }>['type']
  >;
};

type FormFieldNames<T extends FormSchema> = T[number]['name'];

export type {
  FormFieldType,
  FormFieldValue,
  FormFieldDefinition,
  FormSchema,
  InferFormValues,
  FormFieldNames,
};
