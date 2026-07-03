import { Outlet, createFileRoute } from '@tanstack/react-router'
import AppShell from '#/modules/shell/components/app-shell'

export const Route = createFileRoute('/(auth)')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <AppShell showNav={false}>
      <Outlet />
    </AppShell>
  )
}
