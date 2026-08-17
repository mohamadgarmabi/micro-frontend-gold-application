import { Outlet, createFileRoute } from '@tanstack/react-router'
import { requireAuth } from '#/modules/auth/utils/auth.guards'
import AppShell from '#/modules/shell/components/app-shell'

export const Route = createFileRoute('/(app)')({
  beforeLoad: ({ context, location }) => {
    requireAuth({
      auth: context.auth,
      href: location.href,
    })
  },
  component: AppLayout,
})

function AppLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
