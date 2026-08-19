import { useRouterState } from '@tanstack/react-router'
import { ArrowLeftRight, Home, Settings, TrendingUp, User } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { liquidNavItemStyles, liquidNavSliderStyles } from '../components/bottom-nav.styles'
import type { AurumNavPage, BottomNavItem, BottomNavSlider, MessageKey } from '../types'
import { useI18n } from './i18n.hook'

const ACTIVE_MOVE_DELAY_MS = 140

const navItems = [
  { page: 'home' as const, to: '/home' as const, icon: Home },
  { page: 'chart' as const, to: '/chart' as const, icon: TrendingUp },
  { page: 'trade' as const, to: '/trade' as const, icon: ArrowLeftRight },
  { page: 'profile' as const, to: '/profile' as const, icon: User },
  { page: 'options' as const, to: '/options' as const, icon: Settings },
]

const resolveActivePage = (pathname: string): AurumNavPage => {
  const match = navItems.find(
    (item) => pathname === item.to || (item.to === '/home' && pathname === '/'),
  )

  return match?.page ?? 'home'
}

const useBottomNav = () => {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const { t, locale } = useI18n()
  const activePage = resolveActivePage(pathname)
  const [visualPage, setVisualPage] = useState<AurumNavPage>(activePage)
  const [slider, setSlider] = useState<BottomNavSlider>({
    x: 0,
    width: 0,
    isReady: false,
  })
  const trackRef = useRef<HTMLDivElement>(null)
  const canAnimateRef = useRef(false)

  useEffect(() => {
    if (visualPage === activePage) {
      return
    }

    const timer = window.setTimeout(() => {
      setVisualPage(activePage)
    }, ACTIVE_MOVE_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [activePage, visualPage])

  useLayoutEffect(() => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const measure = () => {
      const item = track.querySelector<HTMLElement>(`[data-nav-item="${visualPage}"]`)

      if (!item) {
        return
      }

      const trackBox = track.getBoundingClientRect()
      const itemBox = item.getBoundingClientRect()

      setSlider({
        x: itemBox.left - trackBox.left,
        width: itemBox.width,
        isReady: canAnimateRef.current,
      })

      if (!canAnimateRef.current) {
        requestAnimationFrame(() => {
          canAnimateRef.current = true
          setSlider((current) => ({ ...current, isReady: true }))
        })
      }
    }

    measure()

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(track)
    window.addEventListener('resize', measure)

    const mutationObserver = new MutationObserver(measure)
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    })

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [visualPage, locale])

  const items: BottomNavItem[] = navItems.map((item) => {
    const isActive = item.page === visualPage

    return {
      ...item,
      label: t(`nav.${item.page}` as MessageKey),
      isActive,
      className: liquidNavItemStyles({ active: isActive }),
      strokeWidth: isActive ? 2.4 : 1.75,
    }
  })

  return {
    items,
    trackRef,
    sliderClassName: liquidNavSliderStyles({ ready: slider.isReady }),
    sliderStyle: {
      width: slider.width,
      transform: `translate3d(${slider.x}px, 0, 0)`,
    },
  }
}

export { useBottomNav }
