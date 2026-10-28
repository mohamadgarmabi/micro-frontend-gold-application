import { Link } from "@tanstack/react-router"
import type { BottomNavLinkProps } from "../types"

// Glisse's TabBar renders link tabs with an `href`; TanStack Router's Link takes `to`.
const BottomNavLink = ({ href, ...props }: BottomNavLinkProps) => {
  return <Link to={href} {...props} />
}

export default BottomNavLink
