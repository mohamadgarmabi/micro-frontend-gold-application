import { Outlet, createFileRoute } from '@tanstack/react-router'
import { redirectIfAuthenticated } from '#/modules/auth/utils/auth.guards'
import type { AuthSearchParams } from '#/modules/auth/types'
import AppShell from '#/modules/shell/components/app-shell'

function resolveRedirectSearch(search: unknown): AuthSearchParams['redirect'] {
  if (
    typeof search === 'object' &&
    search !== null &&
    'redirect' in search &&
    typeof search.redirect === 'string'
  ) {
    return search.redirect
  }

  return '/home'
}

export const Route = createFileRoute('/(auth)')({
  beforeLoad: ({ context, search }) => {
    redirectIfAuthenticated({
      auth: context.auth,
      redirectTo: resolveRedirectSearch(search),
    })
  },
  validateSearch: (search) => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : '/home',
  }),
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <AppShell showNav={false}>
      <Outlet />
    </AppShell>
  )
}
