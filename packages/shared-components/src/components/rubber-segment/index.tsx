import { useRubberSegment, useRubberThumb } from "./rubber-segment.hook"
import { rubberSegmentItemStyles } from "./rubber-segment.styles"
import type { RubberSegmentProps } from "./rubber-segment.type"

const RubberSegment = (props: RubberSegmentProps) => {
  const {
    trackRef,
    thumbRef,
    isReady,
    rootClassName,
    thumbClassName,
    rootStyle,
    rows,
    ariaLabel,
    disabled,
    size,
  } = useRubberSegment(props)

  return (
    <div
      ref={trackRef}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      className={rootClassName}
      style={{ ...rootStyle }}
    >
      <span
        ref={thumbRef}
        className={thumbClassName}
        style={{ opacity: isReady ? 1 : 0 }}
        aria-hidden="true"
      />
      {rows.map((row) => (
        <button
          key={row.value}
          ref={row.setRef}
          type="button"
          role="radio"
          aria-checked={row.isActive}
          tabIndex={row.isActive ? 0 : -1}
          disabled={disabled}
          className={rubberSegmentItemStyles({ size, active: row.isActive })}
          onClick={row.onSelect}
        >
          {row.icon}
          {row.label}
        </button>
      ))}
    </div>
  )
}

export default RubberSegment
export { useRubberThumb }
export type { RubberSegmentProps }
