import { toast } from "@gold/shared-components/sonner"
import { useSelector } from "@tanstack/react-store"
import { useRouter, useSearch } from "@tanstack/react-router"
import { buildDefaultValues, defineFormSchema, type FooterButtons } from "@gold/form"
import { Phone } from "lucide-react"
import { createElement, useEffect, useState } from "react"
import { DEMO_OTP_CODE, OTP_RESEND_SECONDS } from "#/config/security.constants"
import { useI18n } from "#/modules/shell/hooks/i18n.hook"
import { authStore } from "../stores/auth.store"
import { securityStore } from "../stores/security.store"
import { useWebAuthn } from "./webauthn.hook"

const OTP_SLOTS = [0, 1, 2, 3, 4, 5] as const

const formatOtpCountdown = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, "0")}`
}

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
      void router.navigate({ to: "/pin", search: { redirect: redirectTo } })
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
  const { login, continueAfterAuth } = useAuth()
  const { t } = useI18n()
  const { redirect } = useSearch({ from: "/(auth)/login" })
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

  const [otpOpen, setOtpOpen] = useState(false)
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState<string | null>(null)
  const [resendSeconds, setResendSeconds] = useState(OTP_RESEND_SECONDS)
  const otpComplete = otp.length === 6
  const canResend = resendSeconds <= 0
  const otpSlotClassName = otpError
    ? "gold-otp-slot bg-accent-foreground border-danger text-danger"
    : "gold-otp-slot bg-accent-foreground"

  useEffect(() => {
    if (!otpOpen) {
      return undefined
    }

    const timerId = globalThis.setInterval(() => {
      setResendSeconds((current) => (current <= 0 ? 0 : current - 1))
    }, 1_000)

    return () => {
      globalThis.clearInterval(timerId)
    }
  }, [otpOpen])

  const startResendCountdown = () => {
    setResendSeconds(OTP_RESEND_SECONDS)
  }

  const openOtpSheet = (nextPhone: string) => {
    setPhone(nextPhone)
    setOtp("")
    setOtpError(null)
    setOtpOpen(true)
    startResendCountdown()
    toast.success(t("auth.otpSentDemo", { code: DEMO_OTP_CODE }))
  }

  const handlePhoneSubmit = (values: { phone: string }) => {
    openOtpSheet(values.phone.trim())
  }

  const handleOtpChange = (value: string) => {
    setOtp(value)
    if (otpError) {
      setOtpError(null)
    }
  }

  const handleOtpOpenChange = (open: boolean) => {
    // Frozen sheet: ignore dismiss / overlay / swipe-to-close.
    if (!open) {
      return
    }

    setOtpOpen(true)
  }

  const closeOtpAndContinue = () => {
    setOtpOpen(false)
    setOtp("")
    setOtpError(null)
    setResendSeconds(OTP_RESEND_SECONDS)
    login(`aurum-demo-token-${Date.now()}`)
    toast.success(t("auth.loginSuccess"))
    continueAfterAuth(redirect)
  }

  const verifyOtp = () => {
    if (otp !== DEMO_OTP_CODE) {
      setOtpError(t("auth.otpInvalid"))
      return
    }

    closeOtpAndContinue()
  }

  const handleResendOtp = () => {
    if (!canResend) {
      return
    }

    setOtp("")
    setOtpError(null)
    startResendCountdown()
    toast.success(t("auth.otpSentDemo", { code: DEMO_OTP_CODE }))
  }

  const handleWebAuthnLogin = () => {
    void signIn()
      .then((session) => {
        login(session.token)
        toast.success(t("auth.webauthnSuccess"))
        continueAfterAuth(redirect)
      })
      .catch(showCancelledOrFailed)
  }

  const phoneSchema = defineFormSchema([
    {
      name: "phone",
      type: "tel",
      label: t("auth.mobileNumber"),
      placeholder: "0912 000 0000",
      required: true,
      leftIcon: createElement(Phone, { size: 18 }),
    },
  ] as const)

  const trustBadges = [t("auth.ssl"), t("auth.fdic"), t("auth.licensed")]

  const footerButtons: FooterButtons = {
    submit: {
      children: t("auth.sendOtp"),
      fullWidth: true,
    },
  }

  const formatRequiredError = (label: string) => t("validation.required", { label })

  const resendLabel = canResend
    ? t("auth.resend")
    : t("auth.resendIn", { time: formatOtpCountdown(resendSeconds) })

  return {
    t,
    handlePhoneSubmit,
    phoneSchema,
    phoneDefaults: buildDefaultValues(phoneSchema),
    trustBadges,
    footerButtons,
    formatRequiredError,
    showWebAuthn,
    webAuthnBusy,
    scanClassName,
    scanIcon,
    scanTitle,
    scanHint,
    orPhoneLabel: t("auth.or"),
    handleWebAuthnLogin,
    otpDrawer: {
      isOpen: otpOpen,
      phone,
      otp,
      setOtp: handleOtpChange,
      otpComplete,
      otpSlots: OTP_SLOTS,
      otpSlotClassName,
      otpError,
      title: t("auth.verifyTitle"),
      hint: t("auth.verifyHint"),
      continueLabel: t("auth.verifyContinue"),
      resendLabel,
      canResend,
      onOpenChange: handleOtpOpenChange,
      onVerify: verifyOtp,
      onResend: handleResendOtp,
    },
  }
}

export { useAuth, useLogin }
