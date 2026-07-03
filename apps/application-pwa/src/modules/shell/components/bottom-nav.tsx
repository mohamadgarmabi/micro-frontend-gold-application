import { Link, useRouterState } from '@tanstack/react-router'
import { ArrowLeftRight, Home, Settings, TrendingUp, User } from 'lucide-react'
import type { AurumNavPage } from '../types'

const navItems: { page: AurumNavPage; to: string; icon: React.ReactNode; label: string }[] = [
  { page: 'home', to: '/home', icon: <Home size={20} />, label: 'Home' },
  { page: 'chart', to: '/chart', icon: <TrendingUp size={20} />, label: 'Chart' },
  { page: 'trade', to: '/trade', icon: <ArrowLeftRight size={20} />, label: 'Trade' },
  { page: 'profile', to: '/profile', icon: <User size={20} />, label: 'Profile' },
  { page: 'options', to: '/options', icon: <Settings size={20} />, label: 'Options' },
]

function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-md items-center justify-around border-t border-border bg-brand-surface/95 px-2 backdrop-blur-lg"
      style={{
        paddingBottom: 'max(env(safe-area-inset-bottom, 12px), 12px)',
      }}
    >
      {navItems.map(({ page, to, icon, label }) => {
        const active = pathname === to || (to === '/home' && pathname === '/')
        return (
          <Link
            key={page}
            to={to}
            className={`relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-3 no-underline transition-all duration-200 ${
              active
                ? 'text-gold-600'
                : 'text-foreground-subtle hover:text-foreground'
            }`}
          >
            <span className={`transition-transform duration-200 ${active ? 'scale-110' : ''}`}>
              {icon}
            </span>
            <span className="text-[10px] font-medium">{label}</span>
            {active && (
              <span className="absolute bottom-1 h-1 w-1 rounded-full bg-gold-600" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomNav
