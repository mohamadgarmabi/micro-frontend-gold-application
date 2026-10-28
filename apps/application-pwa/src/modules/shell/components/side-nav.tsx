import Typography from "@gold/shared-components/typography"
import { Link } from "@tanstack/react-router"
import { Hexagon } from "lucide-react"
import { useSideNav } from "../hooks/side-nav.hook"
import { sideNavBrandStyles, sideNavStyles } from "./side-nav.styles"

const SideNav = () => {
  const { items, brandName, navLabel } = useSideNav()

  return (
    <nav aria-label={navLabel} className={sideNavStyles()}>
      <div className={sideNavBrandStyles()}>
        <span className="bg-accent text-accent-foreground flex size-9 items-center justify-center rounded-(--radius)">
          <Hexagon size={16} strokeWidth={2.4} aria-hidden="true" />
        </span>
        <Typography as="span" size="lg" weight="semibold" className="tracking-tight">
          {brandName}
        </Typography>
      </div>
      {items.map((item) => {
        const Icon = item.icon

        return (
          <Link
            key={item.page}
            to={item.to}
            aria-current={item.ariaCurrent}
            className={item.className}
          >
            <Icon size={18} strokeWidth={2} aria-hidden="true" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default SideNav
