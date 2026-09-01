import Button from '@gold/shared-components/button'
import InputOTP from '@gold/shared-components/input-otp'
import { PIN_LENGTH } from '#/config/security.constants'
import { usePinUnlock } from '../../hooks/pin-unlock.hook'

const PinView = () => {
  const { t, pin, handlePinChange, complete, unlock, error, isBusy, pinSlots } = usePinUnlock()

  return (
    <div className="aurum-gradient-bg flex min-h-screen flex-col bg-background px-6 pt-16">
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-foreground">{t('auth.pinTitle')}</h2>
          <p className="text-sm text-muted">{t('auth.pinHint')}</p>
        </div>

        <InputOTP
          maxLength={PIN_LENGTH}
          value={pin}
          onChange={handlePinChange}
          className="mb-4"
        >
          <InputOTP.Group className="flex gap-3">
            {pinSlots.map((slot) => (
              <InputOTP.Slot key={slot} index={slot} />
            ))}
          </InputOTP.Group>
        </InputOTP>

        {error ? <p className="mb-4 text-center text-sm text-danger">{error}</p> : null}

        <Button
          type="button"
          fullWidth
          isDisabled={!complete || isBusy}
          isPending={isBusy}
          onPress={unlock}
        >
          {t('auth.pinContinue')}
        </Button>
      </div>
    </div>
  )
}

export default PinView
