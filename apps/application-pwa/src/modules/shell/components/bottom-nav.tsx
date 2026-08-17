import { Link } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useBottomNav } from '../hooks/bottom-nav.hook'
import SearchDrawer from './search-drawer'

const BottomNav = () => {
  const { items, visualPage, showSearch, search, trackRef, slider } = useBottomNav()

  return (
    <>
      <nav className={`liquid-nav ${showSearch ? 'is-search-visible' : ''}`}>
        <button
          type="button"
          className={`liquid-nav__search ${search.isOpen ? 'is-active' : ''}`}
          onClick={search.openSearch}
          tabIndex={showSearch ? 0 : -1}
          aria-hidden={!showSearch}
          aria-label="Search"
        >
          <Search size={20} strokeWidth={search.isOpen ? 2.4 : 1.75} />
        </button>
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
      <SearchDrawer
        isOpen={search.isOpen}
        query={search.query}
        results={search.results}
        onOpenChange={(open) => {
          if (open) {
            search.openSearch()
            return
          }

          search.closeSearch()
        }}
        onQueryChange={search.setQuery}
        onClose={search.closeSearch}
      />
    </>
  )
}

export default BottomNav
