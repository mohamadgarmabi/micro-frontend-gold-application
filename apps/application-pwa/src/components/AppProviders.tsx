import Toaster from '@gold/shared-components/sonner'
import { useDirection } from '#/modules/shell/hooks/direction.hook'

function AppProviders() {
  const { direction } = useDirection()

  return (
    <Toaster
      dir={direction}
      theme="dark"
      position={direction === 'rtl' ? 'top-left' : 'top-right'}
    />
  )
}

export default AppProviders
