import { toast } from '@gold/shared-components/sonner'
import { useEffect, useState } from 'react'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import {
  authenticateWithWebAuthn,
  clearWebAuthnCredential,
  getWebAuthnErrorCode,
  isWebAuthnSupported,
  readWebAuthnCredential,
  registerWebAuthnCredential,
} from '../utils/webauthn.utils'

const useWebAuthn = () => {
  const { t } = useI18n()
  const [isSupported, setIsSupported] = useState(false)
  const [hasCredential, setHasCredential] = useState(false)
  const [isBusy, setIsBusy] = useState(false)

  useEffect(() => {
    let cancelled = false

    const detect = async () => {
      const supported = await isWebAuthnSupported()
      if (cancelled) {
        return
      }

      setIsSupported(supported)
      setHasCredential(supported && Boolean(readWebAuthnCredential()))
    }

    void detect()

    return () => {
      cancelled = true
    }
  }, [])

  const showCancelledOrFailed = (error: unknown) => {
    if (getWebAuthnErrorCode(error) === 'cancelled') {
      toast.info(t('auth.webauthnCancelled'))
      return
    }

    toast.error(t('auth.webauthnFailed'))
  }

  const signIn = async () => {
    setIsBusy(true)

    try {
      if (readWebAuthnCredential()) {
        await authenticateWithWebAuthn()
        return
      }

      await registerWebAuthnCredential()
      setHasCredential(true)
    } finally {
      setIsBusy(false)
    }
  }

  const handleBiometricToggle = (enabled: boolean) => {
    if (!isSupported || isBusy) {
      return
    }

    if (!enabled) {
      clearWebAuthnCredential()
      setHasCredential(false)
      toast.info(t('auth.webauthnRemoved'))
      return
    }

    setIsBusy(true)

    void registerWebAuthnCredential()
      .then(() => {
        setHasCredential(true)
        toast.success(t('auth.webauthnRegistered'))
      })
      .catch(showCancelledOrFailed)
      .finally(() => {
        setIsBusy(false)
      })
  }

  return {
    isSupported,
    hasCredential,
    isBusy,
    biometricHint: isSupported ? t('options.biometricHint') : t('options.biometricUnavailable'),
    isBiometricDisabled: !isSupported || isBusy,
    signIn,
    handleBiometricToggle,
    showCancelledOrFailed,
  }
}

export { useWebAuthn }
