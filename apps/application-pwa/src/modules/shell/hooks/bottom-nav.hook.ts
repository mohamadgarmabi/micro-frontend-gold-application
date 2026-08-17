import { useRouterState } from '@tanstack/react-router'
import { ArrowLeftRight, Home, Settings, TrendingUp, User } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { AurumNavPage, BottomNavItem, BottomNavSlider } from '../types'

const ACTIVE_MOVE_DELAY_MS = 140

const navItems: BottomNavItem[] = [
  { page: 'home', to: '/home', icon: Home, label: 'Home' },
  { page: 'chart', to: '/chart', icon: TrendingUp, label: 'Chart' },
  { page: 'trade', to: '/trade', icon: ArrowLeftRight, label: 'Trade' },
  { page: 'profile', to: '/profile', icon: User, label: 'Profile' },
  { page: 'options', to: '/options', icon: Settings, label: 'Settings' },
]

const resolveActivePage = (pathname: string): AurumNavPage => {
  const match = navItems.find(
    (item) => pathname === item.to || (item.to === '/home' && pathname === '/'),
  )

  return match?.page ?? 'home'
}

const useBottomNav = () => {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
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
  }, [visualPage])

  return {
    items: navItems,
    visualPage,
    trackRef,
    slider,
  }
}

export { useBottomNav }
