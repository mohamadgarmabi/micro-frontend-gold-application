import type { AppShellProps } from '../types'
import BottomNav from './bottom-nav'

const AppShell = ({ children, showNav = true }: AppShellProps) => {
  return (
    <>
      <div className="gold-root relative mx-auto min-h-screen max-w-md overflow-x-hidden bg-brand-surface">
        {children}
      </div>
      {showNav && <BottomNav />}
    </>
  )
}

export default AppShell
