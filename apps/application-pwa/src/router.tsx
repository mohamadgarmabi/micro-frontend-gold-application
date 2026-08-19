import { configureApis } from '@gold/apis'
import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import type { AuthContext } from '#/modules/auth/types'
import { resolveViewTransitionTypes } from '#/modules/shell/utils/view-transition.utils'
import NotFoundView from '#/modules/shell/views/not-found-view'
import { apiConfig } from './config/api'
import { routeTree } from './routeTree.gen'

configureApis(apiConfig)

const defaultAuthContext: AuthContext = {
  token: null,
  isAuthenticated: false,
}

const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
      },
    },
  })

  const router = createTanStackRouter({
    routeTree,
    context: {
      queryClient,
      auth: defaultAuthContext,
    },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultViewTransition: {
      types: resolveViewTransitionTypes,
    },
    defaultNotFoundComponent: NotFoundView,
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })

  return router
}

export { getRouter }

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
