import type { AppShellProps } from '../types'
import { appPageStyles, appShellStyles } from './app-shell.styles'
import BottomNav from './bottom-nav'

const AppShell = ({ children, showNav = true }: AppShellProps) => {
  return (
    <>
      <div className={appShellStyles()}>
        <div className={appPageStyles()}>{children}</div>
      </div>
      {showNav ? <BottomNav /> : null}
    </>
  )
}

export default AppShell
