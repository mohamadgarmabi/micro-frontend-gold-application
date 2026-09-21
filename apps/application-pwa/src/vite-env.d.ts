/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "virtual:vite-splash" {
  export const splashCriticalCss: string
  export const splashMarkup: string
  export const splashRuntimeScript: string
}
