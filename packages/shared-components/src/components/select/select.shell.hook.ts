import { useEffect, useRef, useState, type ChangeEvent, type RefObject } from 'react'

const MOBILE_QUERY = '(max-width: 767px)'

type SelectShell = {
  open: boolean
  isMobile: boolean
  search: string
  rootRef: RefObject<HTMLDivElement | null>
  close: () => void
  handleOpenChange: (next: boolean) => void
  handleToggle: () => void
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleDone: () => void
}

const useSelectShell = (disabled: boolean): SelectShell => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches,
  )
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  const close = () => {
    setOpen(false)
    setSearch('')
  }

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    const onChange = () => setIsMobile(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open || isMobile) {
      return
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close()
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, isMobile])

  return {
    open,
    isMobile,
    search,
    rootRef,
    close,
    handleOpenChange: (next: boolean) => {
      setOpen(next)
      if (!next) {
        setSearch('')
      }
    },
    handleToggle: () => {
      if (!disabled) {
        setOpen((current) => !current)
      }
    },
    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.currentTarget.value)
    },
    handleDone: close,
  }
}

export { useSelectShell }
