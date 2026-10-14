import LiquidGlass from "../liquid-glass"
import { useGlassToast } from "./glass-toast.hook"
import type { GlassToastProps, GlassToastType } from "./glass-toast.type"

const GlassToast = (props: GlassToastProps) => {
  const {
    title,
    description,
    hasDescription,
    closeLabel,
    handleClose,
    className,
    contentClassName,
    dotClassName,
    textClassName,
    titleClassName,
    descriptionClassName,
    closeClassName,
  } = useGlassToast(props)

  return (
    <LiquidGlass cornerRadius={16} className={className}>
      <div className={contentClassName}>
        <span className={dotClassName} aria-hidden="true" />
        <div className={textClassName}>
          <div className={titleClassName}>{title}</div>
          {hasDescription ? <div className={descriptionClassName}>{description}</div> : null}
        </div>
        <button
          type="button"
          aria-label={closeLabel}
          className={closeClassName}
          onClick={handleClose}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2.5 2.5l7 7m0-7l-7 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </LiquidGlass>
  )
}

export default GlassToast
export type { GlassToastProps, GlassToastType }
