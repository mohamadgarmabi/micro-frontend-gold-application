import { Outlet, createFileRoute } from '@tanstack/react-router'
import { redirectIfAuthenticated } from '#/modules/auth/utils/auth.guards'
import { resolveRedirectSearch } from '#/modules/auth/utils/auth.utils'
import AppShell from '#/modules/shell/components/app-shell'

const AuthLayout = () => {
  return (
    <AppShell showNav={false}>
      <Outlet />
    </AppShell>
  )
}

export const Route = createFileRoute('/(auth)')({
  beforeLoad: ({ context, search }) => {
    redirectIfAuthenticated({
      auth: context.auth,
      redirectTo: resolveRedirectSearch(search),
    })
  },
  validateSearch: (search) => ({
    redirect: resolveRedirectSearch(search),
  }),
  component: AuthLayout,
})
