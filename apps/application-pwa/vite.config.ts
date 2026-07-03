import { defineConfig, loadEnv } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const PORT = 4400
const DEFAULT_API_URL = 'https://jsonplaceholder.typicode.com'

const workspacePackages = [
  '@gold/apis',
  '@gold/form',
  '@gold/shared-components',
]

function toApiUrlPattern(baseURL: string): RegExp {
  const escaped = baseURL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`^${escaped}/.*`, 'i')
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, '')
  const apiBaseURL = env.VITE_APP_API_URL || DEFAULT_API_URL

  return {
    server: {
      port: PORT,
      strictPort: true,
      host: '127.0.0.1',
    },
    preview: { port: PORT, strictPort: true },
    resolve: { tsconfigPaths: true },
    optimizeDeps: {
      exclude: workspacePackages,
    },
    ssr: {
      noExternal: workspacePackages,
    },
    plugins: [
      devtools(),
      tailwindcss(),
      tanstackStart(),
      viteReact(),
      VitePWA({
        registerType: 'prompt',
        injectRegister: 'auto',
        includeAssets: ['icon.svg', 'robots.txt'],
        manifest: {
          name: 'Aurum — Gold Trading',
          short_name: 'Aurum',
          description: 'Gold trading PWA — trade XAU/USD precisely on the go',
          theme_color: '#08080f',
          background_color: '#08080f',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          categories: ['productivity', 'utilities'],
          icons: [
            {
              src: 'icon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any',
            },
            {
              src: 'icon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          navigateFallback: null,
          runtimeCaching: [
            {
              urlPattern: toApiUrlPattern(apiBaseURL),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
          // dev-dist only contains sw.js + workbox-*.js (both ignored) — no app assets on disk in dev
          suppressWarnings: true,
        },
      }),
    ],
  }
})
