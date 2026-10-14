import LiquidGlass from "@gold/shared-components/liquid-glass"
import { Link } from "@tanstack/react-router"
import { useBottomNav } from "../hooks/bottom-nav.hook"
import {
  bottomNavBarStyles,
  bottomNavDropletStyles,
  bottomNavGlassStyles,
  bottomNavStyles,
  bottomNavThumbLayerStyles,
  bottomNavTrackStyles,
} from "./bottom-nav.styles"

const BottomNav = () => {
  const { items, trackRef, thumbRef, thumbClassName, barTint, barStyle, dropletTint } =
    useBottomNav()

  return (
    <nav className={bottomNavStyles()}>
      <div className={bottomNavBarStyles()}>
        <LiquidGlass
          cornerRadius={26}
          tint={barTint}
          style={barStyle}
          className={bottomNavGlassStyles()}
        >
          <div ref={trackRef} className={bottomNavTrackStyles()}>
            {items.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.page}
                  ref={item.setRef}
                  to={item.to}
                  data-nav-item={item.page}
                  className={item.className}
                >
                  <Icon size={20} strokeWidth={item.strokeWidth} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </LiquidGlass>
        <div className={bottomNavThumbLayerStyles()} aria-hidden="true">
          <span ref={thumbRef} className={thumbClassName}>
            <LiquidGlass
              cornerRadius={20}
              depth={1}
              frost={0}
              tint={dropletTint}
              className={bottomNavDropletStyles()}
            />
          </span>
        </div>
      </div>
    </nav>
  )
}

export default BottomNav
