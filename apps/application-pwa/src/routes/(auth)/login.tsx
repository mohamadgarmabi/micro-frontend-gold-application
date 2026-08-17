import { createFileRoute } from '@tanstack/react-router'
import LoginView from '#/modules/auth/views/login-view'
import { resolveRedirectSearch } from '#/modules/auth/utils/auth.utils'

export const Route = createFileRoute('/(auth)/login')({
  validateSearch: (search) => ({
    redirect: resolveRedirectSearch(search),
  }),
  component: LoginView,
})
