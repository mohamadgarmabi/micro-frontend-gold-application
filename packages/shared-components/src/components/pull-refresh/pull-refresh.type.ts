import type { CSSProperties, ReactNode, RefObject } from 'react'

type PullRefreshStatus = 'idle' | 'pulling' | 'armed' | 'refreshing'

type PullRefreshLabels = {
  pull: string
  release: string
  refreshing: string
}

type PullRefreshProps = {
  children: ReactNode
  onRefresh: () => void | Promise<void>
  disabled?: boolean
  className?: string
  labels?: PullRefreshLabels
}

type PullRefreshModel = {
  children: ReactNode
  containerRef: RefObject<HTMLDivElement | null>
  contentClassName: string
  contentStyle: CSSProperties
  indicatorClassName: string
  indicatorStyle: CSSProperties
  isRefreshing: boolean
  label: string
  loaderClassName: string
  rootClassName: string
}

type PullRefreshSession = {
  id: number
  startX: number
  startY: number
  locked: boolean
  armed: boolean
}

type PullRefreshGestureHandlers = {
  isBusy: () => boolean
  onPull: (offset: number, isArmed: boolean) => void
  onRelease: (isArmed: boolean) => void
}

export type {
  PullRefreshGestureHandlers,
  PullRefreshLabels,
  PullRefreshModel,
  PullRefreshProps,
  PullRefreshSession,
  PullRefreshStatus,
}
