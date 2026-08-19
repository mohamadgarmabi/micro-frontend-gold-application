import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { getAuthSession } from '#/modules/auth/apis/get-auth-session'
import { getSecuritySession } from '#/modules/auth/apis/get-security-session'
import { setAuthContext } from '#/modules/auth/stores/auth.store'
import { securityStore } from '#/modules/auth/stores/security.store'
import type { AuthContext } from '#/modules/auth/types'
import { getDirectionPreference } from '#/modules/shell/apis/get-direction'
import { directionStore } from '#/modules/shell/stores/direction.store'
import { THEME_INIT_SCRIPT, THEME_META_COLORS } from '#/config/theme.constants'
import { DIRECTION_INIT_SCRIPT } from '#/config/direction.constants'
import NotFoundView from '#/modules/shell/views/not-found-view'
import AppProviders from '../components/AppProviders'
import PwaInstallPrompt from '../components/PwaInstallPrompt'

import appCss from '../styles.css?url'

type RouterContext = {
  queryClient: QueryClient
  auth: AuthContext
}

const RootDocument = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: DIRECTION_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="gold-root gold-app-chrome font-sans text-foreground antialiased [overflow-wrap:anywhere] selection:bg-gold-600/20">
        {children}
        <AppProviders />
        <PwaInstallPrompt />
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    const [auth, direction, security] = await Promise.all([
      getAuthSession(),
      getDirectionPreference(),
      getSecuritySession(),
    ])
    setAuthContext(auth)
    securityStore.actions.hydrate(security)
    directionStore.actions.hydrate(direction)

    return { auth }
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      {
        name: 'description',
        content: 'Aurum — Gold trading PWA. Trade gold precisely on the go.',
      },
      { name: 'theme-color', content: THEME_META_COLORS.dark },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { title: 'Aurum — Gold Trading' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/icon.svg' },
    ],
  }),
  notFoundComponent: NotFoundView,
  shellComponent: RootDocument,
})

export type { RouterContext }
