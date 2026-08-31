import { cva } from 'class-variance-authority'

const appShellStyles = cva(
  'gold-root gold-app-frame aurum-gradient-bg relative mx-auto min-h-screen max-w-md overflow-x-clip bg-brand-surface',
)

const appPageStyles = cva('gold-app-page min-h-screen')

export { appPageStyles, appShellStyles }
