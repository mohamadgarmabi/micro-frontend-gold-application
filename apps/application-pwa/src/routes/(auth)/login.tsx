import { createFileRoute } from '@tanstack/react-router'
import LoginView from '#/modules/auth/views/login-view'

export const Route = createFileRoute('/(auth)/login')({
  component: LoginView,
})
