import type { ButtonProps } from './button.type'

const useButton = ({ disabled, loading = false, size = 'md' }: ButtonProps) => {
  return {
    isDisabled: disabled || loading,
    loading,
    size,
  }
}

export { useButton }
