import type { ButtonProps } from './button.type';

function useButton({ disabled, loading = false }: ButtonProps) {
  return {
    isDisabled: disabled || loading,
    loading,
  };
}

export { useButton };
