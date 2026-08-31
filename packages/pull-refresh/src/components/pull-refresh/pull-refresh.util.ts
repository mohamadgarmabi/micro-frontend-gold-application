import type { PullRefreshGestureHandlers, PullRefreshSession } from './pull-refresh.type'

const PULL_THRESHOLD = 64
const PULL_MAX = 112
const PULL_DAMPING = 0.42
const INDICATOR_SIZE = 48
const MIN_REFRESH_MS = 450
const HORIZONTAL_LOCK = 12

const dampenPull = (distance: number) => Math.min(PULL_MAX, Math.max(0, distance) * PULL_DAMPING)

const isContainerAtTop = (element: HTMLElement) => element.scrollTop <= 0

const hasNestedScrollOffset = (target: EventTarget | null, boundary: HTMLElement) => {
  if (!(target instanceof Element)) {
    return false
  }

  let node: Element | null = target

  while (node && node !== boundary) {
    if (node instanceof HTMLElement) {
      const overflowY = window.getComputedStyle(node).overflowY
      const canScroll = overflowY === 'auto' || overflowY === 'scroll'

      if (canScroll && node.scrollTop > 0) {
        return true
      }
    }

    node = node.parentElement
  }

  return false
}

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })

const findTouch = (touches: TouchList, id: number) =>
  Array.from(touches).find((item) => item.identifier === id)

const attachPullRefreshGestures = (
  container: HTMLElement,
  sessionRef: { current: PullRefreshSession | null },
  handlers: PullRefreshGestureHandlers,
) => {
  const onTouchStart = (event: TouchEvent) => {
    if (handlers.isBusy() || event.touches.length !== 1) {
      return
    }

    const touch = event.touches[0]

    if (
      !touch ||
      !isContainerAtTop(container) ||
      hasNestedScrollOffset(event.target, container)
    ) {
      return
    }

    sessionRef.current = {
      id: touch.identifier,
      startX: touch.clientX,
      startY: touch.clientY,
      locked: false,
      armed: false,
    }
  }

  const onTouchMove = (event: TouchEvent) => {
    const session = sessionRef.current
    const touch = session ? findTouch(event.touches, session.id) : undefined

    if (!session || !touch || handlers.isBusy()) {
      return
    }

    const deltaX = touch.clientX - session.startX
    const deltaY = touch.clientY - session.startY

    if (!session.locked) {
      if (Math.abs(deltaX) > HORIZONTAL_LOCK && Math.abs(deltaX) > deltaY) {
        sessionRef.current = null
        return
      }

      if (deltaY < 8 || !isContainerAtTop(container)) {
        return
      }

      session.locked = true
    }

    event.preventDefault()
    const nextOffset = dampenPull(deltaY)
    const isArmed = nextOffset >= PULL_THRESHOLD
    session.armed = isArmed
    handlers.onPull(nextOffset, isArmed)
  }

  const onTouchEnd = (event: TouchEvent) => {
    const session = sessionRef.current

    if (!session || findTouch(event.touches, session.id) || handlers.isBusy()) {
      return
    }

    sessionRef.current = null
    handlers.onRelease(session.armed)
  }

  container.addEventListener('touchstart', onTouchStart, { passive: true })
  container.addEventListener('touchmove', onTouchMove, { passive: false })
  container.addEventListener('touchend', onTouchEnd)
  container.addEventListener('touchcancel', onTouchEnd)

  return () => {
    container.removeEventListener('touchstart', onTouchStart)
    container.removeEventListener('touchmove', onTouchMove)
    container.removeEventListener('touchend', onTouchEnd)
    container.removeEventListener('touchcancel', onTouchEnd)
  }
}

export { INDICATOR_SIZE, MIN_REFRESH_MS, attachPullRefreshGestures, wait }
