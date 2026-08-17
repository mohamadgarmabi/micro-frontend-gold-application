import { useNavigate, useRouter, useSearch } from '@tanstack/react-router'
import { useSelector } from '@tanstack/react-store'
import { toast } from '@gold/shared-components/sonner'
import { useState } from 'react'
import { authStore } from '../stores/auth.store'

function useAuth() {
  const router = useRouter()
  const token = useSelector(authStore, (state) => state.token)
  const isAuthenticated = useSelector(authStore, (state) => state.isAuthenticated)

  const login = (nextToken: string) => {
    authStore.actions.setSession(nextToken)
    router.invalidate()
  }

  const logout = () => {
    authStore.actions.clearSession()
    router.invalidate()
  }

  return {
    token,
    isAuthenticated,
    login,
    logout,
  }
}

function useLogin() {
  const navigate = useNavigate()
  const { redirect } = useSearch({ from: '/(auth)/login' })
  const [phone, setPhone] = useState('')
  const [cc, setCc] = useState('+1')
  const canSubmit = phone.length >= 7

  const goToOtp = () => {
    toast.success('کد تأیید ارسال شد')
    navigate({ to: '/otp', search: { redirect } })
  }

  return { phone, setPhone, cc, setCc, canSubmit, goToOtp }
}

function useOtp() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { redirect } = useSearch({ from: '/(auth)/otp' })
  const [otp, setOtp] = useState('')
  const complete = otp.length === 6

  const verify = () => {
    login(`aurum-demo-token-${Date.now()}`)
    toast.success('ورود با موفقیت انجام شد')
    navigate({ to: redirect })
  }

  const goBack = () => navigate({ to: '/login', search: { redirect } })

  return { otp, setOtp, complete, verify, goBack }
}

export { useAuth, useLogin, useOtp }
