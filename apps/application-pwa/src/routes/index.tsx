import { createFileRoute, redirect } from '@tanstack/react-router'
import { getSecurityState } from '#/modules/auth/stores/security.store'
import { needsPinUnlock } from '#/modules/auth/utils/security.utils'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: '/home' },
      })
    }

    if (needsPinUnlock(getSecurityState())) {
      throw redirect({
        to: '/pin',
        search: { redirect: '/home' },
      })
    }

    throw redirect({
      to: '/home',
    })
  },
})
