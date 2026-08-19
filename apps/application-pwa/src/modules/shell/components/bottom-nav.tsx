import { Link } from '@tanstack/react-router'
import { useBottomNav } from '../hooks/bottom-nav.hook'
import {
  liquidNavBarStyles,
  liquidNavGlowStyles,
  liquidNavIndicatorStyles,
  liquidNavStyles,
  liquidNavTrackStyles,
} from './bottom-nav.styles'

const BottomNav = () => {
  const { items, trackRef, sliderClassName, sliderStyle } = useBottomNav()

  return (
    <nav className={liquidNavStyles()}>
      <div className={liquidNavBarStyles()}>
        <div ref={trackRef} className={liquidNavTrackStyles()}>
          <span className={sliderClassName} style={sliderStyle} aria-hidden="true">
            <span className={liquidNavGlowStyles()} />
            <span className={liquidNavIndicatorStyles()} />
          </span>
          {items.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.page}
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
      </div>
    </nav>
  )
}

export default BottomNav
