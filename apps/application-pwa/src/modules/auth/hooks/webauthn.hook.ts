import { toast } from '@gold/shared-components/sonner'
import { Fingerprint, LoaderCircle } from 'lucide-react'
import { createElement, useEffect, useState } from 'react'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import {
  authenticateWithWebAuthn,
  getWebAuthnErrorCode,
  isWebAuthnSupported,
  readWebAuthnCredential,
  registerWebAuthnCredential,
  removeWebAuthnCredential,
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
      return await authenticateWithWebAuthn()
    } finally {
      setIsBusy(false)
    }
  }

  const handleBiometricToggle = (enabled: boolean) => {
    if (!isSupported || isBusy) {
      return
    }

    if (!enabled) {
      setIsBusy(true)

      void removeWebAuthnCredential()
        .then(() => {
          setHasCredential(false)
          toast.info(t('auth.webauthnRemoved'))
        })
        .catch(showCancelledOrFailed)
        .finally(() => {
          setIsBusy(false)
        })

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

  const scanIcon = createElement(isBusy ? LoaderCircle : Fingerprint, {
    size: 28,
    strokeWidth: 1.7,
    className: isBusy ? 'animate-spin' : undefined,
  })

  return {
    isSupported,
    hasCredential,
    isBusy,
    biometricHint: isSupported ? t('options.biometricHint') : t('options.biometricUnavailable'),
    isBiometricDisabled: !isSupported || isBusy,
    scanClassName: isBusy ? 'aurum-bio-scan is-busy' : 'aurum-bio-scan',
    scanIcon,
    scanTitle: isBusy ? t('auth.webauthnBusy') : t('auth.webauthn'),
    scanHint: t('auth.webauthnHint'),
    signIn,
    handleBiometricToggle,
    showCancelledOrFailed,
  }
}

export { useWebAuthn }
