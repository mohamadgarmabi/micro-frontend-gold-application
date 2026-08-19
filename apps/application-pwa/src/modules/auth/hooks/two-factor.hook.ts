import { toast } from '@gold/shared-components/sonner'
import { useSelector } from '@tanstack/react-store'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import { securityStore } from '../stores/security.store'

const useTwoFactor = () => {
  const { t } = useI18n()
  const twoFactorEnabled = useSelector(securityStore, (state) => state.twoFactorEnabled)

  const handleTwoFactorChange = (enabled: boolean) => {
    securityStore.actions.setTwoFactorEnabled(enabled)
    toast.info(t(enabled ? 'options.twoFactorOn' : 'options.twoFactorOff'))
  }

  return {
    t,
    twoFactorEnabled,
    handleTwoFactorChange,
    statusLabel: t(twoFactorEnabled ? 'options.active' : 'options.inactive'),
  }
}

export { useTwoFactor }
