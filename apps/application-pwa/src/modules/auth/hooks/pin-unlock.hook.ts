import { useSelector } from '@tanstack/react-store'
import { useRouter, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { PIN_LENGTH } from '#/config/security.constants'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import { securityStore } from '../stores/security.store'
import { resolveRedirectSearch } from '../utils/auth.utils'
import { verifyPinHash } from '../utils/security.utils'

const pinSlots = [0, 1, 2, 3]

const usePinUnlock = () => {
  const router = useRouter()
  const { t } = useI18n()
  const redirect = resolveRedirectSearch(useSearch({ strict: false }))
  const pinHash = useSelector(securityStore, (state) => state.pinHash)
  const [pin, setPin] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isBusy, setIsBusy] = useState(false)
  const complete = pin.length === PIN_LENGTH

  const unlockWithValue = async (value: string) => {
    if (!pinHash || isBusy || value.length !== PIN_LENGTH) {
      return
    }

    setIsBusy(true)
    const matches = await verifyPinHash(value, pinHash)
    setIsBusy(false)

    if (!matches) {
      setError(t('auth.pinWrong'))
      setPin('')
      return
    }

    securityStore.actions.unlock()
    router.invalidate()
    void router.navigate({ href: redirect })
  }

  const unlock = () => {
    void unlockWithValue(pin)
  }

  const handlePinChange = (value: string) => {
    setPin(value)
    setError(null)
    void unlockWithValue(value)
  }

  return {
    t,
    pin,
    handlePinChange,
    complete,
    unlock,
    error,
    isBusy,
    pinSlots,
  }
}

export { usePinUnlock }
