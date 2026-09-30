import Button from "@gold/shared-components/button"
import Drawer from "@gold/shared-components/drawer"
import InputOTP from "@gold/shared-components/input-otp"
import Link from "@gold/shared-components/link"
import Typography from "@gold/shared-components/typography"

type OtpDrawerProps = {
  isOpen: boolean
  phone: string
  otp: string
  setOtp: (value: string) => void
  otpComplete: boolean
  otpSlots: readonly number[]
  otpSlotClassName: string
  otpError: string | null
  title: string
  hint: string
  continueLabel: string
  resendLabel: string
  canResend: boolean
  onOpenChange: (open: boolean) => void
  onVerify: () => void
  onResend: () => void
}

const OtpDrawer = ({
  isOpen,
  phone,
  otp,
  setOtp,
  otpComplete,
  otpSlots,
  otpSlotClassName,
  otpError,
  title,
  hint,
  continueLabel,
  resendLabel,
  canResend,
  onOpenChange,
  onVerify,
  onResend,
}: OtpDrawerProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} dismissible={false} modal>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content className="px-5 pb-8">
          <Drawer.Title className="mt-4 text-center text-lg">{title}</Drawer.Title>
          <Drawer.Description className="text-foreground-subtle mt-1 text-center text-sm">
            {hint}{" "}
            <Typography
              as="span"
              size="sm"
              weight="medium"
              className="inline-block [direction:ltr]"
            >
              {phone}
            </Typography>
          </Drawer.Description>

          <div className="mt-6 mb-6" dir="ltr">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                className="gold-otp-group w-full max-w-xs"
                aria-invalid={Boolean(otpError) || undefined}
              >
                <InputOTP.Group className="gold-otp-group flex w-full justify-center gap-3">
                  {otpSlots.map((slot) => (
                    <InputOTP.Slot key={slot} index={slot} className={otpSlotClassName} />
                  ))}
                </InputOTP.Group>
              </InputOTP>
            </div>

            {otpError ? (
              <Typography size="sm" color="danger" align="center" className="mt-3">
                {otpError}
              </Typography>
            ) : null}
          </div>
          <Button
            type="button"
            fullWidth
            className="mb-4"
            isDisabled={!otpComplete}
            onPress={onVerify}
          >
            {continueLabel}
          </Button>

          {canResend ? (
            <Link className="text-muted mx-auto block text-center text-sm" onPress={onResend}>
              {resendLabel}
            </Link>
          ) : (
            <Typography
              size="sm"
              color="muted"
              align="center"
              className="flex w-full items-center justify-center"
            >
              {resendLabel}
            </Typography>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer>
  )
}

export default OtpDrawer
export type { OtpDrawerProps }
