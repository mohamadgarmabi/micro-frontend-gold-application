import { cva } from 'class-variance-authority'

const appShellStyles = cva(
  'gold-root gold-app-frame relative mx-auto min-h-screen max-w-md overflow-x-hidden bg-brand-surface',
)

const appPageStyles = cva('gold-app-page min-h-screen')

export { appPageStyles, appShellStyles }
