import { createFileRoute } from '@tanstack/react-router'
import OtpView from '#/modules/auth/views/otp-view'
import { resolveRedirectSearch } from '#/modules/auth/utils/auth.utils'

export const Route = createFileRoute('/(auth)/otp')({
  validateSearch: (search) => ({
    redirect: resolveRedirectSearch(search),
  }),
  component: OtpView,
})
