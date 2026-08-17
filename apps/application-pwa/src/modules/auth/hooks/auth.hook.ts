import { toast } from '@gold/shared-components/sonner'
import { useSelector } from '@tanstack/react-store'
import { useNavigate, useRouter, useSearch } from '@tanstack/react-router'
import {
  LockIcon,
  MailIcon,
  buildDefaultValues,
  defineFormSchema,
  type FooterButtons,
} from '@gold/form'
import { useState, createElement, type ChangeEvent } from 'react'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import { authStore } from '../stores/auth.store'
import { useWebAuthn } from './webauthn.hook'

const countryCodes = ['+1', '+44', '+49', '+971', '+65', '+91']

const useAuth = () => {
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

const useLogin = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useI18n()
  const { redirect } = useSearch({ from: '/(auth)/login' })
  const [phone, setPhone] = useState('')
  const [cc, setCc] = useState('+1')
  const canSubmit = phone.length >= 7
  const {
    isSupported: showWebAuthn,
    isBusy: webAuthnBusy,
    signIn,
    showCancelledOrFailed,
  } = useWebAuthn()

  const goToOtp = () => {
    toast.success(t('auth.otpSent'))
    navigate({ to: '/otp', search: { redirect } })
  }

  const handleWebAuthnLogin = () => {
    void signIn()
      .then(() => {
        login(`aurum-demo-token-${Date.now()}`)
        toast.success(t('auth.webauthnSuccess'))
        navigate({ to: redirect })
      })
      .catch(showCancelledOrFailed)
  }

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCc(event.target.value)
  }

  const passwordSchema = defineFormSchema([
    {
      name: 'email',
      type: 'email',
      label: t('auth.email'),
      placeholder: 'you@example.com',
      required: true,
      leftIcon: createElement(MailIcon),
    },
    {
      name: 'password',
      type: 'password',
      label: t('auth.password'),
      placeholder: '••••••••',
      required: true,
      leftIcon: createElement(LockIcon),
    },
  ] as const)

  const trustBadges = [t('auth.ssl'), t('auth.fdic'), t('auth.licensed')]

  const footerButtons: FooterButtons = {
    submit: {
      children: t('auth.signInPassword'),
    },
  }

  return {
    t,
    phone,
    setPhone,
    cc,
    handleCountryChange,
    canSubmit,
    goToOtp,
    countryCodes,
    passwordSchema,
    passwordDefaults: buildDefaultValues(passwordSchema),
    trustBadges,
    footerButtons,
    showWebAuthn,
    webAuthnBusy,
    handleWebAuthnLogin,
  }
}

const useOtp = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useI18n()
  const { redirect } = useSearch({ from: '/(auth)/otp' })
  const [otp, setOtp] = useState('')
  const complete = otp.length === 6

  const verify = () => {
    login(`aurum-demo-token-${Date.now()}`)
    toast.success(t('auth.loginSuccess'))
    navigate({ to: redirect })
  }

  const goBack = () => navigate({ to: '/login', search: { redirect } })

  const otpSlots = [0, 1, 2, 3, 4, 5]

  return { t, otp, setOtp, complete, verify, goBack, otpSlots }
}

export { useAuth, useLogin, useOtp }
