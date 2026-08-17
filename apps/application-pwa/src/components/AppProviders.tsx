import Toaster from '@gold/shared-components/sonner'
import { useDirection } from '#/modules/shell/hooks/direction.hook'
import { useTheme } from '#/modules/shell/hooks/theme.hook'

function AppProviders() {
  const { direction } = useDirection()
  const { resolvedTheme } = useTheme()

  return (
    <Toaster
      dir={direction}
      theme={resolvedTheme}
      position={direction === 'rtl' ? 'top-left' : 'top-right'}
    />
  )
}

export default AppProviders
