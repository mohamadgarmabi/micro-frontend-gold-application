import { toast } from '@gold/shared-components/sonner'
import { Check, Clock } from 'lucide-react'
import { useState } from 'react'
import { useWebAuthn } from '#/modules/auth/hooks/webauthn.hook'
import { useDirection } from '#/modules/shell/hooks/direction.hook'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import { useTheme } from '#/modules/shell/hooks/theme.hook'
import { resolveLocale, translate } from '#/modules/shell/utils/i18n.utils'
import type { ThemePreference } from '#/modules/shell/types'
import type { SavedAlert } from '../types'

const currencyOptions = ['USD', 'EUR', 'GBP', 'AED']

const useOptions = () => {
  const [notifications, setNotifications] = useState(true)
  const [priceAlert, setPriceAlert] = useState('3350')
  const { isRtl, setDirection } = useDirection()
  const { preference, setTheme } = useTheme()
  const { t } = useI18n()
  const {
    hasCredential: biometric,
    biometricHint,
    isBiometricDisabled,
    handleBiometricToggle,
  } = useWebAuthn()

  const handleThemeChange = (nextTheme: ThemePreference) => {
    setTheme(nextTheme)
    const labels = {
      light: t('options.toastLight'),
      dark: t('options.toastDark'),
      system: t('options.toastSystem'),
    }
    toast.info(labels[nextTheme])
  }

  const handleDirectionChange = (rtl: boolean) => {
    const nextDirection = rtl ? 'rtl' : 'ltr'
    setDirection(nextDirection)
    toast.info(
      translate(
        resolveLocale(nextDirection),
        nextDirection === 'rtl' ? 'options.toastRtl' : 'options.toastLtr',
      ),
    )
  }

  const handleSaveAlert = () => {
    toast.success(t('options.toastAlert'))
  }

  const savedAlerts: SavedAlert[] = [
    {
      price: '$3,400',
      directionLabel: t('options.above'),
      rowClassName: 'flex items-center justify-between rounded-lg p-2.5 bg-gold-600/10',
      icon: Check,
      iconClassName: 'text-gold-600',
    },
    {
      price: '$3,200',
      directionLabel: t('options.below'),
      rowClassName: 'flex items-center justify-between rounded-lg p-2.5 bg-gold-600/10',
      icon: Check,
      iconClassName: 'text-gold-600',
    },
    {
      price: '$3,100',
      directionLabel: t('options.below'),
      rowClassName: 'flex items-center justify-between rounded-lg p-2.5 opacity-50',
      icon: Clock,
      iconClassName: 'text-foreground-subtle',
    },
  ]

  const aboutItems = [t('options.terms'), t('options.privacy'), t('options.disclosures')]

  return {
    t,
    notifications,
    setNotifications,
    biometric,
    biometricHint,
    isBiometricDisabled,
    handleBiometricToggle,
    priceAlert,
    setPriceAlert,
    isRtl,
    preference,
    handleThemeChange,
    handleDirectionChange,
    handleSaveAlert,
    savedAlerts,
    aboutItems,
    currencyOptions,
  }
}

export { useOptions }
