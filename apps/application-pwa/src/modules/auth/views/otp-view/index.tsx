import Button from '@gold/shared-components/button'
import InputOTP from '@gold/shared-components/input-otp'
import Link from '@gold/shared-components/link'
import { ChevronLeft } from 'lucide-react'
import { useOtp } from '../../hooks/otp.hook'

const OtpView = () => {
  const { t, otp, setOtp, complete, verify, goBack, handleResend, otpSlots } = useOtp()

  return (
    <div className="aurum-gradient-bg flex min-h-screen flex-col bg-background px-6 pt-12">
      <Button variant="ghost" className="mb-8 w-fit" onPress={goBack}>
        <ChevronLeft size={18} className="gold-rtl-flip" />
        <span>{t('auth.back')}</span>
      </Button>

      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-foreground">{t('auth.verifyTitle')}</h2>
          <p className="text-sm text-muted">
            {t('auth.verifyHint')} <span className="text-foreground">+1 (555) 000-0000</span>
          </p>
        </div>

        <InputOTP
          maxLength={6}
          value={otp}
          onChange={setOtp}
          className="mb-8"
        >
          <InputOTP.Group className="flex gap-3">
            {otpSlots.map((slot) => (
              <InputOTP.Slot key={slot} index={slot} />
            ))}
          </InputOTP.Group>
        </InputOTP>

        <Button type="button" fullWidth className="mb-4" isDisabled={!complete} onPress={verify}>
          {t('auth.verifyContinue')}
        </Button>

        <Link className="text-center text-sm text-muted" onPress={handleResend}>
          {t('auth.resend')}
        </Link>
      </div>
    </div>
  )
}

export default OtpView
