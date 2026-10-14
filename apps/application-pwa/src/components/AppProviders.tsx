import Toaster from "@gold/shared-components/toaster"
import { useDirection } from "#/modules/shell/hooks/direction.hook"
import { useLiquidGlassSync } from "#/modules/shell/hooks/liquid-glass.hook"
import { useViteSplash } from "#/modules/shell/hooks/splash.hook"
import { useTheme } from "#/modules/shell/hooks/theme.hook"

const AppProviders = () => {
  const { direction, toasterPosition } = useDirection()
  const { resolvedTheme } = useTheme()

  useViteSplash({ resolvedTheme })
  useLiquidGlassSync()

  return <Toaster dir={direction} position={toasterPosition} />
}

export default AppProviders
