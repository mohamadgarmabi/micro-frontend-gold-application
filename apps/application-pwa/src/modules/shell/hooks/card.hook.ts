import { mergeClassName } from "@gold/shared-components/cn"
import type { CardProps } from "../types"

const useShellCard = ({ children, className }: CardProps) => {
  return {
    children,
    className: mergeClassName("border-border/40 bg-transparent shadow-none", className),
  }
}

export { useShellCard }
