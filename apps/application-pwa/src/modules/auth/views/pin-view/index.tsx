import Button from '@gold/shared-components/button'
import OTPField from '@gold/shared-components/otp-field'
import { PIN_LENGTH } from '#/config/security.constants'
import { usePinUnlock } from '../../hooks/pin-unlock.hook'

const PinView = () => {
  const { t, pin, handlePinChange, complete, unlock, error, isBusy, pinSlots } = usePinUnlock()

  return (
    <div className="aurum-gradient-bg flex min-h-screen flex-col px-6 pt-16">
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
        <div className="mb-8">
          <h2 className="aurum-serif mb-2 text-2xl font-semibold text-foreground">
            {t('auth.pinTitle')}
          </h2>
          <p className="text-sm text-foreground-subtle">{t('auth.pinHint')}</p>
        </div>

        <OTPField
          length={PIN_LENGTH}
          value={pin}
          onValueChange={handlePinChange}
          className="mb-4 flex gap-3"
        >
          {pinSlots.map((slot) => (
            <OTPField.Input key={slot} />
          ))}
        </OTPField>

        {error ? <p className="mb-4 text-center text-sm text-danger">{error}</p> : null}

        <Button
          type="button"
          onClick={unlock}
          disabled={!complete || isBusy}
          loading={isBusy}
          className="w-full rounded-xl py-3.5 shadow-lg shadow-neutral-900/10 disabled:shadow-none dark:shadow-white/10"
        >
          {t('auth.pinContinue')}
        </Button>
      </div>
    </div>
  )
}

export default PinView
