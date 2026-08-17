import { Link } from '@tanstack/react-router'
import { useBottomNav } from '../hooks/bottom-nav.hook'

const BottomNav = () => {
  const { items, visualPage, trackRef, slider } = useBottomNav()

  return (
    <nav className="liquid-nav">
      <div className="liquid-nav__bar">
        <div ref={trackRef} className="liquid-nav__track">
          <span
            className={`liquid-nav__slider ${slider.isReady ? 'is-ready' : ''}`}
            style={{
              width: slider.width,
              transform: `translate3d(${slider.x}px, 0, 0)`,
            }}
            aria-hidden="true"
          >
            <span className="liquid-nav__glow" />
            <span className="liquid-nav__indicator" />
          </span>
          {items.map((item) => {
            const Icon = item.icon
            const isActive = item.page === visualPage

            return (
              <Link
                key={item.page}
                to={item.to}
                viewTransition={false}
                data-nav-item={item.page}
                className={`liquid-nav__item ${isActive ? 'is-active' : ''}`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.4 : 1.75} />
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
