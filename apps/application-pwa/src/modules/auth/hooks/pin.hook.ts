import { toast } from '@gold/shared-components/sonner'
import { useSelector } from '@tanstack/react-store'
import { useState } from 'react'
import { PIN_LENGTH } from '#/config/security.constants'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import type { MessageKey } from '#/modules/shell/types'
import { securityStore } from '../stores/security.store'
import type { PinStep } from '../types'
import { hashPin, verifyPinHash } from '../utils/security.utils'

const pinSlots = [0, 1, 2, 3]

const pinTitleKeys: Record<PinStep, MessageKey> = {
  current: 'options.pinCurrent',
  create: 'options.pinNew',
  confirm: 'options.pinConfirm',
}

const usePinDrawer = () => {
  const { t } = useI18n()
  const pinHash = useSelector(securityStore, (state) => state.pinHash)
  const hasPin = Boolean(pinHash)
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<PinStep>(hasPin ? 'current' : 'create')
  const [pin, setPin] = useState('')
  const [pendingPin, setPendingPin] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isBusy, setIsBusy] = useState(false)

  const reset = (nextHasPin = hasPin) => {
    setPin('')
    setPendingPin('')
    setError(null)
    setIsBusy(false)
    setStep(nextHasPin ? 'current' : 'create')
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    reset()
  }

  const handleOpen = () => {
    handleOpenChange(true)
  }

  const completeCurrent = async (value: string) => {
    if (!pinHash || !(await verifyPinHash(value, pinHash))) {
      setError(t('options.pinWrong'))
      setPin('')
      return
    }

    setError(null)
    setPin('')
    setStep('create')
  }

  const completeCreate = (value: string) => {
    setPendingPin(value)
    setError(null)
    setPin('')
    setStep('confirm')
  }

  const completeConfirm = async (value: string) => {
    if (value !== pendingPin) {
      setError(t('options.pinMismatch'))
      setPin('')
      setPendingPin('')
      setStep('create')
      return
    }

    securityStore.actions.setPinHash(await hashPin(value))
    toast.success(t(hasPin ? 'options.pinChanged' : 'options.pinSaved'))
    handleOpenChange(false)
  }

  const handlePinChange = (value: string) => {
    setPin(value)
    setError(null)

    if (value.length !== PIN_LENGTH || isBusy) {
      return
    }

    setIsBusy(true)
    const run = async () => {
      if (step === 'current') {
        await completeCurrent(value)
        return
      }

      if (step === 'create') {
        completeCreate(value)
        return
      }

      await completeConfirm(value)
    }

    void run().finally(() => {
      setIsBusy(false)
    })
  }

  return {
    isOpen,
    handleOpen,
    handleOpenChange,
    pin,
    handlePinChange,
    pinSlots,
    error,
    rowLabel: t(hasPin ? 'options.changePin' : 'options.setPin'),
    title: t(pinTitleKeys[step]),
    hint: t('options.pinHint'),
  }
}

export { usePinDrawer }
