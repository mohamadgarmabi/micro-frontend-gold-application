import type { PullRefreshProps } from './pull-refresh.type'
import { usePullRefresh } from './pull-refresh.hook'

const PullRefresh = (props: PullRefreshProps) => {
  const {
    children,
    containerRef,
    contentClassName,
    contentStyle,
    indicatorClassName,
    indicatorStyle,
    isRefreshing,
    label,
    loaderClassName,
    rootClassName,
  } = usePullRefresh(props)

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      aria-busy={isRefreshing}
      aria-label={label}
    >
      <div className={indicatorClassName} style={indicatorStyle}>
        <svg
          aria-hidden="true"
          className={loaderClassName}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
      <div className={contentClassName} style={contentStyle}>
        {children}
      </div>
    </div>
  )
}

export default PullRefresh
export type { PullRefreshLabels, PullRefreshProps } from './pull-refresh.type'
