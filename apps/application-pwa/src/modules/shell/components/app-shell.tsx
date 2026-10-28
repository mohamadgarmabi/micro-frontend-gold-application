import PullRefresh from "@gold/shared-components/pull-refresh"
import { useAppShell } from "../hooks/app-shell.hook"
import type { AppShellProps } from "../types"
import { appShellMainStyles, appShellPageStyles, appShellStyles } from "./app-shell.styles"
import BottomNav from "./bottom-nav"
import SideNav from "./side-nav"

const AppShell = ({ children, showNav = true }: AppShellProps) => {
  const { onRefresh, pullRefreshLabels } = useAppShell()

  return (
    <>
      <div className={appShellStyles()}>
        {showNav ? <SideNav /> : null}
        <div className={appShellMainStyles()}>
          <PullRefresh onRefresh={onRefresh} labels={pullRefreshLabels}>
            <div className={appShellPageStyles()}>{children}</div>
          </PullRefresh>
        </div>
      </div>
      {showNav ? <BottomNav /> : null}
    </>
  )
}

export default AppShell
