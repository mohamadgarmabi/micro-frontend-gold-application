import { useRouterState } from "@tanstack/react-router"
import type { MessageKey, SideNavItem } from "../types"
import { sideNavItemStyles } from "../components/side-nav.styles"
import { navItems, resolveActivePage } from "./bottom-nav.hook"
import { useI18n } from "./i18n.hook"

const useSideNav = () => {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const { t } = useI18n()
  const activePage = resolveActivePage(pathname)

  const items: SideNavItem[] = navItems.map((item) => {
    const isActive = item.page === activePage

    return {
      page: item.page,
      to: item.to,
      icon: item.icon,
      label: t(`nav.${item.page}` as MessageKey),
      ariaCurrent: isActive ? "page" : undefined,
      className: sideNavItemStyles({ active: isActive }),
    }
  })

  return {
    items,
    brandName: t("home.brand"),
    navLabel: t("nav.label"),
  }
}

export { useSideNav }
