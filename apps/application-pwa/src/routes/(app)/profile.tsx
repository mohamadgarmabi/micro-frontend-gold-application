import { createFileRoute } from '@tanstack/react-router'
import ProfileView from '#/modules/profile/views/profile-view'

export const Route = createFileRoute('/(app)/profile')({
  component: ProfileView,
})
