import { toast } from '@gold/shared-components/sonner'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { DEMO_OTP_CODE } from '#/config/security.constants'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import { useAuth } from './auth.hook'

const useOtp = () => {
  const navigate = useNavigate()
  const { login, continueAfterAuth } = useAuth()
  const { t } = useI18n()
  const { redirect } = useSearch({ from: '/(auth)/otp' })
  const [otp, setOtp] = useState('')
  const complete = otp.length === 6

  const verify = () => {
    if (otp !== DEMO_OTP_CODE) {
      toast.error(t('auth.otpInvalid'))
      return
    }

    login(`aurum-demo-token-${Date.now()}`)
    toast.success(t('auth.loginSuccess'))
    continueAfterAuth(redirect)
  }

  const goBack = () => navigate({ to: '/login', search: { redirect } })

  const handleResend = () => {
    toast.success(t('auth.otpSentDemo', { code: DEMO_OTP_CODE }))
  }

  const otpSlots = [0, 1, 2, 3, 4, 5]

  return { t, otp, setOtp, complete, verify, goBack, handleResend, otpSlots }
}

export { useOtp }
