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
import { createElement } from 'react'
import { DEMO_OTP_CODE } from '#/config/security.constants'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import { authStore } from '../stores/auth.store'
import { securityStore } from '../stores/security.store'
import { useWebAuthn } from './webauthn.hook'

const useAuth = () => {
  const router = useRouter()
  const token = useSelector(authStore, (state) => state.token)
  const isAuthenticated = useSelector(authStore, (state) => state.isAuthenticated)

  const login = (nextToken: string) => {
    authStore.actions.setSession(nextToken)

    if (securityStore.state.pinHash) {
      securityStore.actions.lock()
    } else {
      securityStore.actions.unlock()
    }

    router.invalidate()
  }

  const logout = () => {
    authStore.actions.clearSession()
    securityStore.actions.lock()
    router.invalidate()
  }

  const continueAfterAuth = (redirectTo: string) => {
    if (securityStore.state.pinHash) {
      void router.navigate({ to: '/pin', search: { redirect: redirectTo } })
      return
    }

    void router.navigate({ href: redirectTo })
  }

  return {
    token,
    isAuthenticated,
    login,
    logout,
    continueAfterAuth,
  }
}

const useLogin = () => {
  const navigate = useNavigate()
  const { login, continueAfterAuth } = useAuth()
  const { t } = useI18n()
  const { redirect } = useSearch({ from: '/(auth)/login' })
  const twoFactorEnabled = useSelector(securityStore, (state) => state.twoFactorEnabled)
  const {
    isSupported,
    hasCredential,
    isBusy: webAuthnBusy,
    scanClassName,
    scanIcon,
    scanTitle,
    scanHint,
    signIn,
    showCancelledOrFailed,
  } = useWebAuthn()
  const showWebAuthn = isSupported && hasCredential

  const handlePasswordSignIn = () => {
    if (twoFactorEnabled) {
      toast.success(t('auth.otpSentDemo', { code: DEMO_OTP_CODE }))
      navigate({ to: '/otp', search: { redirect } })
      return
    }

    login(`aurum-demo-token-${Date.now()}`)
    toast.success(t('auth.loginSuccess'))
    continueAfterAuth(redirect)
  }

  const handleWebAuthnLogin = () => {
    void signIn()
      .then((session) => {
        login(session.token)
        toast.success(t('auth.webauthnSuccess'))
        continueAfterAuth(redirect)
      })
      .catch(showCancelledOrFailed)
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
    handlePasswordSignIn,
    passwordSchema,
    passwordDefaults: buildDefaultValues(passwordSchema),
    trustBadges,
    footerButtons,
    showWebAuthn,
    webAuthnBusy,
    scanClassName,
    scanIcon,
    scanTitle,
    scanHint,
    orPasswordLabel: t('auth.orPassword'),
    handleWebAuthnLogin,
  }
}

export { useAuth, useLogin }
