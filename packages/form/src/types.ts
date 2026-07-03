import type { ReactNode } from 'react';

export type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'checkbox';

export type FormFieldValue<TType extends FormFieldType> = TType extends 'checkbox'
  ? boolean
  : string;

export type FormFieldDefinition<
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

export type FormSchema = readonly FormFieldDefinition[];

export type InferFormValues<T extends FormSchema> = {
  [K in T[number]['name']]: FormFieldValue<
    Extract<T[number], { name: K }>['type']
  >;
};

export type FormFieldNames<T extends FormSchema> = T[number]['name'];
