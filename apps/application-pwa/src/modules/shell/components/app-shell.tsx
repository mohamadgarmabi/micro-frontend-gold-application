import type { AppShellProps } from '../types'
import BottomNav from './bottom-nav'

function AppShell({ children, showNav = true }: AppShellProps) {
  return (
    <div className="gold-root relative mx-auto min-h-screen max-w-md overflow-x-hidden bg-brand-surface">
      {children}
      {showNav && <BottomNav />}
    </div>
  )
}

export default AppShell
