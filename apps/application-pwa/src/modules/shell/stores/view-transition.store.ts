import { createStore } from '@tanstack/store'
import { DEFAULT_VIEW_TRANSITION_ENABLED } from '#/config/view-transition.constants'
import {
  persistViewTransitionEnabled,
  readViewTransitionEnabled,
} from '../utils/view-transition.utils'

const viewTransitionStore = createStore(DEFAULT_VIEW_TRANSITION_ENABLED, ({ setState }) => ({
  hydrate: (enabled: boolean) => {
    setState(() => enabled)
    return enabled
  },
  syncFromStorage: () => {
    const enabled = readViewTransitionEnabled()
    persistViewTransitionEnabled(enabled)
    setState(() => enabled)
    return enabled
  },
  setEnabled: (enabled: boolean) => {
    persistViewTransitionEnabled(enabled)
    setState(() => enabled)
    return enabled
  },
}))

export { viewTransitionStore }
