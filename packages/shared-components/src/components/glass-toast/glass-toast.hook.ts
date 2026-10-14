import {
  glassToastCloseStyles,
  glassToastContentStyles,
  glassToastDescriptionStyles,
  glassToastDotStyles,
  glassToastStyles,
  glassToastTextStyles,
  glassToastTitleStyles,
} from "./glass-toast.styles"
import type { GlassToastProps } from "./glass-toast.type"

const useGlassToast = ({
  type,
  title,
  description,
  closeLabel = "Close",
  onClose,
}: GlassToastProps) => {
  return {
    title,
    description,
    hasDescription: description !== undefined && description !== null && description !== "",
    closeLabel,
    handleClose: onClose,
    className: glassToastStyles(),
    contentClassName: glassToastContentStyles(),
    dotClassName: glassToastDotStyles({ type }),
    textClassName: glassToastTextStyles(),
    titleClassName: glassToastTitleStyles(),
    descriptionClassName: glassToastDescriptionStyles(),
    closeClassName: glassToastCloseStyles(),
  }
}

export { useGlassToast }
