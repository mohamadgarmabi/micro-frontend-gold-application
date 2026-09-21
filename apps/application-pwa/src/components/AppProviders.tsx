import Toaster from "@gold/shared-components/sonner"
import { useDirection } from "#/modules/shell/hooks/direction.hook"
import { useViteSplash } from "#/modules/shell/hooks/splash.hook"
import { useTheme } from "#/modules/shell/hooks/theme.hook"

const AppProviders = () => {
  const { direction, toasterPosition } = useDirection()
  const { resolvedTheme } = useTheme()

  useViteSplash({ resolvedTheme })

  return <Toaster dir={direction} theme={resolvedTheme} position={toasterPosition} />
}

export default AppProviders
