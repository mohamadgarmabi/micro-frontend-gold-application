import PullRefresh from '@gold/shared-components/pull-refresh'
import { useAppShell } from '../hooks/app-shell.hook'
import type { AppShellProps } from '../types'
import { appShellStyles } from './app-shell.styles'
import BottomNav from './bottom-nav'

const AppShell = ({ children, showNav = true }: AppShellProps) => {
  const { onRefresh, pullRefreshLabels } = useAppShell()

  return (
    <>
      <div className={appShellStyles()}>
        <PullRefresh onRefresh={onRefresh} labels={pullRefreshLabels}>
          {children}
        </PullRefresh>
      </div>
      {showNav ? <BottomNav /> : null}
    </>
  )
}

export default AppShell
