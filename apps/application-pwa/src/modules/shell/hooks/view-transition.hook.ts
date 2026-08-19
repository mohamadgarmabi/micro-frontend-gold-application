import { useSelector } from '@tanstack/react-store'
import { useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import { viewTransitionStore } from '../stores/view-transition.store'
import { getDefaultViewTransition } from '../utils/view-transition.utils'

const applyViewTransitionOption = (router: ReturnType<typeof useRouter>, enabled: boolean) => {
  router.update({
    context: router.options.context,
    defaultViewTransition: getDefaultViewTransition(enabled),
  })
}

const useViewTransitionPreference = () => {
  const router = useRouter()
  const enabled = useSelector(viewTransitionStore, (state) => state)

  useEffect(() => {
    const stored = viewTransitionStore.actions.syncFromStorage()
    applyViewTransitionOption(router, stored)
  }, [router])

  const setEnabled = (nextEnabled: boolean) => {
    viewTransitionStore.actions.setEnabled(nextEnabled)
    applyViewTransitionOption(router, nextEnabled)
  }

  return {
    enabled,
    setEnabled,
  }
}

export { useViewTransitionPreference }
