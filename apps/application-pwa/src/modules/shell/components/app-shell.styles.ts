import { cva } from "class-variance-authority"

const appShellStyles = cva(
  "gold-root gold-app-frame relative mx-auto h-dvh max-w-md overflow-hidden bg-background lg:flex lg:max-w-none",
)

const appShellMainStyles = cva("h-full lg:min-w-0 lg:flex-1")

const appShellPageStyles = cva("gold-app-page min-h-full lg:mx-auto lg:max-w-5xl lg:px-4")

export { appShellMainStyles, appShellPageStyles, appShellStyles }
