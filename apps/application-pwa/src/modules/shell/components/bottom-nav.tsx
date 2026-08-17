import { Link } from '@tanstack/react-router'
import { useBottomNav } from '../hooks/bottom-nav.hook'

const BottomNav = () => {
  const { items, trackRef, sliderClassName, sliderStyle } = useBottomNav()

  return (
    <nav className="liquid-nav">
      <div className="liquid-nav__bar">
        <div ref={trackRef} className="liquid-nav__track">
          <span className={sliderClassName} style={sliderStyle} aria-hidden="true">
            <span className="liquid-nav__glow" />
            <span className="liquid-nav__indicator" />
          </span>
          {items.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.page}
                to={item.to}
                viewTransition={false}
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
