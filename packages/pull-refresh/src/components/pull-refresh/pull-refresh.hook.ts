import { useEffect, useRef, useState } from 'react'
import {
  pullRefreshContentStyles,
  pullRefreshIndicatorStyles,
  pullRefreshLoaderStyles,
  pullRefreshRootStyles,
} from './pull-refresh.styles'
import type {
  PullRefreshLabels,
  PullRefreshModel,
  PullRefreshProps,
  PullRefreshSession,
  PullRefreshStatus,
} from './pull-refresh.type'
import { INDICATOR_SIZE, MIN_REFRESH_MS, attachPullRefreshGestures, wait } from './pull-refresh.util'

const defaultLabels: PullRefreshLabels = {
  pull: 'Pull to refresh',
  release: 'Release to refresh',
  refreshing: 'Refreshing',
}

const resolveLabel = (status: PullRefreshStatus, labels: PullRefreshLabels) => {
  if (status === 'armed') {
    return labels.release
  }

  if (status === 'refreshing') {
    return labels.refreshing
  }

  return labels.pull
}

const usePullRefresh = ({
  children,
  className,
  disabled = false,
  labels = defaultLabels,
  onRefresh,
}: PullRefreshProps): PullRefreshModel => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sessionRef = useRef<PullRefreshSession | null>(null)
  const statusRef = useRef<PullRefreshStatus>('idle')
  const onRefreshRef = useRef(onRefresh)
  const [offset, setOffset] = useState(0)
  const [status, setStatus] = useState<PullRefreshStatus>('idle')

  onRefreshRef.current = onRefresh

  const setPullStatus = (next: PullRefreshStatus) => {
    statusRef.current = next
    setStatus(next)
  }

  useEffect(() => {
    const container = containerRef.current

    if (!container || disabled) {
      return
    }

    const refresh = async () => {
      setPullStatus('refreshing')
      setOffset(INDICATOR_SIZE)
      const startedAt = Date.now()

      await onRefreshRef.current()
      const remaining = MIN_REFRESH_MS - (Date.now() - startedAt)

      if (remaining > 0) {
        await wait(remaining)
      }

      setOffset(0)
      setPullStatus('idle')
    }

    return attachPullRefreshGestures(container, sessionRef, {
      isBusy: () => statusRef.current === 'refreshing',
      onPull: (nextOffset, isArmed) => {
        setOffset(nextOffset)
        setPullStatus(isArmed ? 'armed' : 'pulling')
      },
      onRelease: (isArmed) => {
        if (isArmed) {
          void refresh()
          return
        }

        setOffset(0)
        setPullStatus('idle')
      },
    })
  }, [disabled])

  const isRefreshing = status === 'refreshing'

  return {
    children,
    containerRef,
    contentClassName: pullRefreshContentStyles(),
    contentStyle: {
      transform: `translateY(${offset}px)`,
      transition: status === 'pulling' || status === 'armed' ? 'none' : 'transform 180ms ease-out',
    },
    indicatorClassName: pullRefreshIndicatorStyles(),
    indicatorStyle: { height: INDICATOR_SIZE, opacity: offset > 8 ? 1 : 0 },
    isRefreshing,
    label: resolveLabel(status, labels),
    loaderClassName: pullRefreshLoaderStyles({ spinning: isRefreshing || status === 'armed' }),
    rootClassName: pullRefreshRootStyles({ className }),
  }
}

export { usePullRefresh }
