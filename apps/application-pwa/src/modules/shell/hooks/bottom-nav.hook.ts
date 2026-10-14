import type { CSSProperties } from "react"
import { useRubberThumb } from "@gold/shared-components/rubber-segment"
import { useRouterState } from "@tanstack/react-router"
import { ArrowLeftRight, Home, Settings, TrendingUp, User } from "lucide-react"
import { bottomNavItemStyles, bottomNavThumbStyles } from "../components/bottom-nav.styles"
import type { AurumNavPage, BottomNavItem, MessageKey } from "../types"
import { useI18n } from "./i18n.hook"
import { useTheme } from "./theme.hook"

const navItems = [
  { page: "home" as const, to: "/home" as const, icon: Home },
  { page: "chart" as const, to: "/chart" as const, icon: TrendingUp },
  { page: "trade" as const, to: "/trade" as const, icon: ArrowLeftRight },
  { page: "profile" as const, to: "/profile" as const, icon: User },
  { page: "options" as const, to: "/options" as const, icon: Settings },
]

const resolveActivePage = (pathname: string): AurumNavPage => {
  const match = navItems.find(
    (item) => pathname === item.to || (item.to === "/home" && pathname === "/"),
  )

  return match?.page ?? "home"
}

const useBottomNav = () => {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const { t, locale } = useI18n()
  const { isLight } = useTheme()
  const activePage = resolveActivePage(pathname)
  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.page === activePage),
  )
  const { trackRef, thumbRef, isReady, registerSlotElement } = useRubberThumb({
    activeIndex,
    stretch: 100,
    squash: 3,
    speed: 1,
    remeasureKey: `${locale}:${isLight}`,
  })

  const items: BottomNavItem[] = navItems.map((item, index) => {
    const isActive = item.page === activePage

    return {
      ...item,
      label: t(`nav.${item.page}` as MessageKey),
      isActive,
      className: bottomNavItemStyles({ active: isActive }),
      strokeWidth: isActive ? 2.4 : 1.75,
      setRef: (element: HTMLAnchorElement | null) => registerSlotElement(index, element),
    }
  })

  return {
    items,
    trackRef,
    thumbRef,
    barTint: isLight ? "rgba(255, 255, 255, 0.22)" : "rgba(255, 255, 255, 0.05)",
    barStyle: {
      "--lg-shadow": "0 8px 28px rgba(0, 0, 0, 0.08)",
    } as CSSProperties,
    dropletTint: "color-mix(in oklab, var(--accent) 16%, transparent)",
    thumbClassName: bottomNavThumbStyles({ ready: isReady }),
  }
}

export { useBottomNav }
