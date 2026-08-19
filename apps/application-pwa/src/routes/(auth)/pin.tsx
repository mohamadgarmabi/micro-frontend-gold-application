import { createFileRoute, redirect } from '@tanstack/react-router'
import { requireAuth } from '#/modules/auth/utils/auth.guards'
import { getSecurityState } from '#/modules/auth/stores/security.store'
import { resolveRedirectSearch } from '#/modules/auth/utils/auth.utils'
import PinView from '#/modules/auth/views/pin-view'

export const Route = createFileRoute('/(auth)/pin')({
  validateSearch: (search) => ({
    redirect: resolveRedirectSearch(search),
  }),
  beforeLoad: ({ context, location }) => {
    requireAuth({
      auth: context.auth,
      href: location.href,
    })

    const security = getSecurityState()

    if (!security.pinHash || security.pinUnlocked) {
      throw redirect({ to: '/home' })
    }
  },
  component: PinView,
})
