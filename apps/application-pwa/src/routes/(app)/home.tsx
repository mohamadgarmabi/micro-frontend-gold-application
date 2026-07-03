import { createFileRoute } from '@tanstack/react-router'
import HomeView from '#/modules/home/views/home-view'

export const Route = createFileRoute('/(app)/home')({
  component: HomeView,
})
