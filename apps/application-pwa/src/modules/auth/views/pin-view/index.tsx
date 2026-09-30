import Button from "@gold/shared-components/button"
import InputOTP from "@gold/shared-components/input-otp"
import Typography from "@gold/shared-components/typography"
import { PIN_LENGTH } from "#/config/security.constants"
import { usePinUnlock } from "../../hooks/pin-unlock.hook"

const PinView = () => {
  const { t, pin, handlePinChange, complete, unlock, error, isBusy, pinSlots } = usePinUnlock()

  return (
    <div className="aurum-gradient-bg bg-background flex min-h-screen flex-col px-6 pt-16">
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
        <div className="mb-8">
          <Typography as="h2" size="display" weight="semibold" className="mb-2 text-2xl">
            {t("auth.pinTitle")}
          </Typography>
          <Typography size="sm" color="muted">
            {t("auth.pinHint")}
          </Typography>
        </div>

        <div className="mb-4 flex justify-center" dir="ltr">
          <InputOTP
            maxLength={PIN_LENGTH}
            value={pin}
            onChange={handlePinChange}
            className="gold-otp-group w-full max-w-xs"
          >
            <InputOTP.Group className="gold-otp-group flex w-full justify-center gap-3">
              {pinSlots.map((slot) => (
                <InputOTP.Slot key={slot} index={slot} className="gold-otp-slot" />
              ))}
            </InputOTP.Group>
          </InputOTP>
        </div>

        {error ? (
          <Typography size="sm" color="danger" align="center" className="mb-4">
            {error}
          </Typography>
        ) : null}

        <Button
          type="button"
          fullWidth
          isDisabled={!complete || isBusy}
          isPending={isBusy}
          onPress={unlock}
        >
          {t("auth.pinContinue")}
        </Button>
      </div>
    </div>
  )
}

export default PinView
