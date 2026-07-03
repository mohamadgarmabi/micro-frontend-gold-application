import Button from '@gold/shared-components/button'
import OTPField from '@gold/shared-components/otp-field'
import { ChevronLeft } from 'lucide-react'
import { useOtp } from '../../hooks/auth.hook'

function OtpView() {
  const { otp, setOtp, complete, verify, goBack } = useOtp()

  return (
    <div className="aurum-gradient-bg flex min-h-screen flex-col px-6 pt-12">
        <button
          type="button"
          onClick={goBack}
          className="mb-8 flex items-center gap-1 text-foreground-subtle transition-colors hover:text-foreground"
        >
          <ChevronLeft size={18} className="gold-rtl-flip" />
          <span className="text-sm">Back</span>
        </button>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
          <div className="mb-8">
            <h2 className="aurum-serif mb-2 text-2xl font-semibold text-foreground">
              Verify your number
            </h2>
            <p className="text-sm text-foreground-subtle">
              Enter the 6-digit code sent to{' '}
              <span className="text-gold-600">+1 (555) 000-0000</span>
            </p>
          </div>

          <OTPField
            length={6}
            value={otp}
            onValueChange={setOtp}
            className="mb-8 flex gap-3"
          >
            {Array.from({ length: 6 }, (_, index) => (
              <OTPField.Input key={index} index={index} />
            ))}
          </OTPField>

          <Button
            type="button"
            onClick={verify}
            disabled={!complete}
            className="mb-4 w-full rounded-xl py-3.5 shadow-lg shadow-gold-600/25 disabled:shadow-none"
          >
            Verify & Continue
          </Button>

          <button
            type="button"
            className="text-center text-sm text-foreground-subtle transition-colors hover:text-gold-600"
          >
            Didn&apos;t receive code? Resend in 0:45
          </button>
        </div>
    </div>
  )
}

export default OtpView
