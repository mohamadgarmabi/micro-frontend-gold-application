import { createFileRoute } from '@tanstack/react-router'
import OptionsView from '#/modules/options/views/options-view'

export const Route = createFileRoute('/(app)/options')({
  component: OptionsView,
})
