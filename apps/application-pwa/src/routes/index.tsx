import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    throw redirect({
      to: context.auth.isAuthenticated ? '/home' : '/login',
      search: context.auth.isAuthenticated ? undefined : { redirect: '/home' },
    })
  },
})
