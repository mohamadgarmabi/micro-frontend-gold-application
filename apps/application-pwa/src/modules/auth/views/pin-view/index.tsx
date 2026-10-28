import InputOTP from "@gold/shared-components/input-otp"
import Typography from "@gold/shared-components/typography"
import { Button, Glass } from "glisse"
import { PIN_LENGTH } from "#/config/security.constants"
import { usePinUnlock } from "../../hooks/pin-unlock.hook"

const PinView = () => {
  const { t, pin, handlePinChange, complete, unlock, error, isBusy, pinSlots, switchAccount } =
    usePinUnlock()

  return (
    <div className="aurum-gradient-bg bg-background flex min-h-dvh flex-col px-6 pt-16 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
        <div className="mb-8">
          <Typography as="h2" size="display" weight="semibold" className="mb-2 text-2xl">
            {t("auth.pinTitle")}
          </Typography>
          <Typography size="sm" color="muted">
            {t("auth.pinHint")}
          </Typography>
        </div>

        <Glass className="mb-4 rounded-3xl p-4">
          <div className="flex justify-center" dir="ltr">
            <InputOTP
              maxLength={PIN_LENGTH}
              noScriptCSSFallback={null}
              value={pin}
              onChange={handlePinChange}
              className="gold-otp-group w-full max-w-xs"
            >
              <InputOTP.Group className="gold-otp-group flex w-full justify-center gap-3">
                {pinSlots.map((slot) => (
                  <InputOTP.Slot
                    key={slot}
                    index={slot}
                    className="gold-otp-slot border-border-strong bg-surface-muted text-foreground data-filled:border-gold-600 aspect-square min-w-0 flex-1 rounded-xl border p-0 text-lg leading-none font-medium"
                  />
                ))}
              </InputOTP.Group>
            </InputOTP>
          </div>
        </Glass>

        <Typography role="alert" size="sm" color="danger" align="center" className="mb-4 min-h-5">
          {error}
        </Typography>

        <Button
          type="button"
          variant="filled"
          className="w-full"
          disabled={!complete || isBusy}
          aria-busy={isBusy}
          onClick={unlock}
        >
          {t("auth.pinContinue")}
        </Button>

        <Button type="button" onClick={switchAccount} className="mt-auto w-full">
          {t("auth.pinSwitchAccount")}
        </Button>
      </div>
    </div>
  )
}

export default PinView
