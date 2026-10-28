import { useRouterState } from "@tanstack/react-router"
import { ArrowLeftRight, Home, Settings, TrendingUp, User } from "lucide-react"
import { createElement } from "react"
import BottomNavLabel from "../components/bottom-nav-label"
import type { AurumNavPage, BottomNavItem, MessageKey } from "../types"
import { useDirection } from "./direction.hook"
import { useI18n } from "./i18n.hook"

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
  const { t } = useI18n()
  const { isRtl } = useDirection()

  const items: BottomNavItem[] = navItems.map((item) => ({
    value: item.page,
    href: item.to,
    label: createElement(BottomNavLabel, {
      icon: item.icon,
      label: t(`nav.${item.page}` as MessageKey),
    }),
  }))

  return {
    // Glisse only lays tabs out left to right, so RTL reverses the order instead.
    items: isRtl ? [...items].reverse() : items,
    activePage: resolveActivePage(pathname),
  }
}

export { useBottomNav }
