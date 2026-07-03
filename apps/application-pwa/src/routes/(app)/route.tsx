import { Outlet, createFileRoute } from '@tanstack/react-router'
import AppShell from '#/modules/shell/components/app-shell'

export const Route = createFileRoute('/(app)')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
