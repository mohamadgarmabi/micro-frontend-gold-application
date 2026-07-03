import { useNavigate } from '@tanstack/react-router'
import { toast } from '@gold/shared-components/sonner'
import { useState } from 'react'

function useLogin() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [cc, setCc] = useState('+1')
  const canSubmit = phone.length >= 7

  const goToOtp = () => {
    toast.success('کد تأیید ارسال شد')
    navigate({ to: '/otp' })
  }

  return { phone, setPhone, cc, setCc, canSubmit, goToOtp }
}

function useOtp() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const complete = otp.length === 6

  const verify = () => {
    toast.success('ورود با موفقیت انجام شد')
    navigate({ to: '/home' })
  }

  const goBack = () => navigate({ to: '/login' })

  return { otp, setOtp, complete, verify, goBack }
}

export { useLogin, useOtp }
