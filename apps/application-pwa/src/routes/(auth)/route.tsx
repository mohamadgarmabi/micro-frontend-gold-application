import { Outlet, createFileRoute } from '@tanstack/react-router'
import { redirectIfAuthenticated } from '#/modules/auth/utils/auth.guards'
import { getSecurityState } from '#/modules/auth/stores/security.store'
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
  validateSearch: (search) => ({
    redirect: resolveRedirectSearch(search),
  }),
  beforeLoad: ({ context, location }) => {
    redirectIfAuthenticated({
      auth: context.auth,
      security: getSecurityState(),
      pathname: location.pathname,
      redirectTo: resolveRedirectSearch(location.search),
    })
  },
  component: AuthLayout,
})
