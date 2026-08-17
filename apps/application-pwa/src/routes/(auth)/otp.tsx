import { createFileRoute } from '@tanstack/react-router'
import OtpView from '#/modules/auth/views/otp-view'

export const Route = createFileRoute('/(auth)/otp')({
  validateSearch: (search) => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : '/home',
  }),
  component: OtpView,
})
