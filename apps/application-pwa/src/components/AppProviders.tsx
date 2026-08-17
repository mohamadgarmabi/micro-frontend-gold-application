import Toaster from '@gold/shared-components/sonner'
import { useDirection } from '#/modules/shell/hooks/direction.hook'
import { useTheme } from '#/modules/shell/hooks/theme.hook'

const AppProviders = () => {
  const { direction, toasterPosition } = useDirection()
  const { resolvedTheme } = useTheme()

  return <Toaster dir={direction} theme={resolvedTheme} position={toasterPosition} />
}

export default AppProviders
