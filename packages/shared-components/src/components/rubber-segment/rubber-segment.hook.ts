import { animate, useMotionValue, useMotionValueEvent, useReducedMotion } from "motion/react"
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react"
import type {
  RubberSegmentItem,
  RubberSegmentProps,
  RubberSlot,
  UseRubberThumbModel,
  UseRubberThumbOptions,
} from "./rubber-segment.type"
import { rubberSegmentStyles, rubberSegmentThumbStyles } from "./rubber-segment.styles"

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]
const SPRING_UI = { type: "spring" as const, duration: 0.3, bounce: 0 }
const SPRING_RELAX = { type: "spring" as const, duration: 0.16, bounce: 0 }
const DILATE = 0.19
const HANDOFF = 0.15

const hasValidSlot = (slot: RubberSlot | undefined) => Boolean(slot && slot.right - slot.left > 0)

const normalizeItems = (items: RubberSegmentItem[]) =>
  items.map((item) => (typeof item === "string" ? { value: item, label: item } : item))

const useRubberThumb = ({
  activeIndex,
  stretch = 100,
  squash = 3,
  speed = 1,
  enabled = true,
  remeasureKey = 0,
}: UseRubberThumbOptions): UseRubberThumbModel => {
  const reduceMotion = useReducedMotion()
  const [isReady, setIsReady] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLSpanElement>(null)
  const slotElementsRef = useRef<(HTMLElement | null)[]>([])
  const slotsRef = useRef<RubberSlot[]>([])
  const committedRef = useRef(activeIndex)
  const handoffRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const generationRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const hasMountedRef = useRef(false)

  const edgeLeft = useMotionValue(0)
  const edgeRight = useMotionValue(0)

  const scaleTime = (seconds: number) => seconds / Math.max(0.1, speed)

  const paintThumb = (left: number, right: number) => {
    const thumb = thumbRef.current

    if (!thumb) {
      return
    }

    thumb.style.left = `${left}px`
    thumb.style.width = `${Math.max(0, right - left)}px`
  }

  useMotionValueEvent(edgeLeft, "change", (left) => {
    paintThumb(left, edgeRight.get())
  })

  useMotionValueEvent(edgeRight, "change", (right) => {
    paintThumb(edgeLeft.get(), right)
  })

  const jumpTo = (index: number) => {
    const slot = slotsRef.current[index]

    if (!hasValidSlot(slot)) {
      return
    }

    clearTimeout(handoffRef.current)
    generationRef.current += 1
    isAnimatingRef.current = false
    edgeLeft.jump(slot.left)
    edgeRight.jump(slot.right)
    paintThumb(slot.left, slot.right)
  }

  const land = (to: number, withSquash: boolean) => {
    const slot = slotsRef.current[to]

    if (!hasValidSlot(slot)) {
      isAnimatingRef.current = false
      return
    }

    const generation = ++generationRef.current
    const center = (edgeLeft.get() + edgeRight.get()) / 2
    const targetCenter = (slot.left + slot.right) / 2
    const direction = Math.sign(targetCenter - center) || 1
    const [lead, leadTo, trail, trailTo] =
      direction > 0
        ? [edgeRight, slot.right, edgeLeft, slot.left]
        : [edgeLeft, slot.left, edgeRight, slot.right]

    animate(lead, leadTo, { ...SPRING_UI, duration: scaleTime(0.3) })

    if (!withSquash || squash <= 0 || reduceMotion) {
      animate(trail, trailTo, { ...SPRING_UI, duration: scaleTime(0.3) }).then(() => {
        if (generationRef.current === generation) {
          isAnimatingRef.current = false
        }
      })
      return
    }

    animate(trail, trailTo + direction * squash, {
      ...SPRING_UI,
      duration: scaleTime(0.3),
    }).then(() => {
      if (generationRef.current !== generation) {
        return
      }

      animate(trail, trailTo, { ...SPRING_RELAX, duration: scaleTime(0.16) }).then(() => {
        if (generationRef.current === generation) {
          isAnimatingRef.current = false
        }
      })
    })
  }

  const travel = (from: number, to: number) => {
    const fromSlot = slotsRef.current[from]
    const toSlot = slotsRef.current[to]

    if (!hasValidSlot(fromSlot) || !hasValidSlot(toSlot)) {
      jumpTo(to)
      return
    }

    clearTimeout(handoffRef.current)
    generationRef.current += 1
    isAnimatingRef.current = true

    if (reduceMotion) {
      edgeLeft.jump(toSlot.left)
      edgeRight.jump(toSlot.right)
      paintThumb(toSlot.left, toSlot.right)
      isAnimatingRef.current = false
      return
    }

    const stretchAmount = stretch / 100
    const tween = { duration: scaleTime(DILATE), ease: EASE_OUT }
    animate(
      edgeLeft,
      toSlot.left + (Math.min(fromSlot.left, toSlot.left) - toSlot.left) * stretchAmount,
      tween,
    )
    animate(
      edgeRight,
      toSlot.right + (Math.max(fromSlot.right, toSlot.right) - toSlot.right) * stretchAmount,
      tween,
    )
    handoffRef.current = setTimeout(() => land(to, true), scaleTime(HANDOFF) * 1000)
  }

  const measure = () => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const trackRect = track.getBoundingClientRect()
    slotsRef.current = slotElementsRef.current.map((element) => {
      if (!element) {
        return { left: 0, right: 0 }
      }

      const rect = element.getBoundingClientRect()

      return {
        left: rect.left - trackRect.left,
        right: rect.right - trackRect.left,
      }
    })

    if (!isAnimatingRef.current) {
      jumpTo(committedRef.current)
    }

    if (hasValidSlot(slotsRef.current[committedRef.current])) {
      setIsReady(true)
    }
  }

  const registerSlotElement = (index: number, element: HTMLElement | null) => {
    slotElementsRef.current[index] = element
  }

  useLayoutEffect(() => {
    if (!enabled) {
      return
    }

    measure()

    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      committedRef.current = activeIndex
      jumpTo(activeIndex)
    }

    const track = trackRef.current

    if (!track) {
      return
    }

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(track)
    window.addEventListener("resize", measure)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", measure)
      clearTimeout(handoffRef.current)
      edgeLeft.stop()
      edgeRight.stop()
      isAnimatingRef.current = false
    }
  }, [enabled, remeasureKey])

  useEffect(() => {
    if (!enabled || !isReady || !hasMountedRef.current) {
      return
    }

    if (committedRef.current === activeIndex) {
      return
    }

    const from = committedRef.current
    committedRef.current = activeIndex
    travel(from, activeIndex)
  }, [activeIndex, enabled, isReady])

  return {
    trackRef,
    thumbRef,
    isReady,
    measure,
    registerSlotElement,
  }
}

const useRubberSegment = (props: RubberSegmentProps) => {
  const {
    items,
    value,
    defaultValue,
    onChange,
    trackColor = "#27272a",
    thumbColor = "#fafafa",
    textColor = "#fafafa",
    activeTextColor = "#18181b",
    size = "md",
    radius = 10,
    inset = 3,
    equalSlots = true,
    stretch = 100,
    squash = 3,
    speed = 1,
    disabled = false,
    className = "",
    "aria-label": ariaLabel = "Segmented control",
  } = props

  const list = normalizeItems(items)
  const [innerValue, setInnerValue] = useState(defaultValue ?? list[0]?.value)
  const currentValue = value !== undefined ? value : innerValue
  const activeIndex = Math.max(
    0,
    list.findIndex((item) => item.value === currentValue),
  )
  const thumbRadius = Math.max(0, radius - inset)
  const { trackRef, thumbRef, isReady, registerSlotElement } = useRubberThumb({
    activeIndex,
    stretch,
    squash,
    speed,
    enabled: !disabled,
  })

  const handleSelect = (index: number) => {
    if (disabled || index === activeIndex) {
      return
    }

    const next = list[index]

    if (!next) {
      return
    }

    if (value === undefined) {
      setInnerValue(next.value)
    }

    onChange?.(next.value, index)
  }

  const rootClassName = rubberSegmentStyles({ equal: equalSlots, className })
  const thumbClassName = rubberSegmentThumbStyles()
  const rootStyle = {
    "--rs-track": trackColor,
    "--rs-thumb": thumbColor,
    "--rs-ink": textColor,
    "--rs-ink-active": activeTextColor,
    "--rs-radius": `${radius}px`,
    "--rs-inset": `${inset}px`,
    "--rs-thumb-radius": `${thumbRadius}px`,
  } as CSSProperties

  const rows = list.map((item, index) => ({
    ...item,
    index,
    isActive: index === activeIndex,
    onSelect: () => handleSelect(index),
    setRef: (element: HTMLButtonElement | null) => registerSlotElement(index, element),
  }))

  return {
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
  }
}

export { useRubberSegment, useRubberThumb }
