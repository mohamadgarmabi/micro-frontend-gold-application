import { Outlet, createFileRoute } from '@tanstack/react-router'
import { requireAuth, requirePinUnlock } from '#/modules/auth/utils/auth.guards'
import { getSecurityState } from '#/modules/auth/stores/security.store'
import AppShell from '#/modules/shell/components/app-shell'

const AppLayout = () => {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}

export const Route = createFileRoute('/(app)')({
  beforeLoad: ({ context, location }) => {
    requireAuth({
      auth: context.auth,
      href: location.href,
    })
    requirePinUnlock({
      auth: context.auth,
      security: getSecurityState(),
      href: location.href,
    })
  },
  component: AppLayout,
})
