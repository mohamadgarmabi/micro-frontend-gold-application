import type { InputProps } from './input.type';

function useInput({ id, name, error = false, errorMessage }: InputProps) {
  const inputId = id ?? name;

  return {
    inputId,
    errorDescribedBy:
      error && errorMessage && inputId ? `${inputId}-error` : undefined,
  };
}

export { useInput };
