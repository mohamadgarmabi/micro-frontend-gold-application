import { TabBar } from "glisse"
import { useBottomNav } from "../hooks/bottom-nav.hook"
import { bottomNavBarStyles, bottomNavStyles, bottomNavTabBarStyles } from "./bottom-nav.styles"
import BottomNavLink from "./bottom-nav-link"

const BottomNav = () => {
  const { items, activePage } = useBottomNav()

  return (
    <nav className={bottomNavStyles()}>
      <div className={bottomNavBarStyles()}>
        <TabBar
          dir="ltr"
          items={items}
          value={activePage}
          link={BottomNavLink}
          className={bottomNavTabBarStyles()}
        />
      </div>
    </nav>
  )
}

export default BottomNav
