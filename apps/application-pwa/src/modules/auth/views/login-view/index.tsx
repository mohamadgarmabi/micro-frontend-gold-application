import Separator from "@gold/shared-components/separator"
import Typography from "@gold/shared-components/typography"
import { GeneratedForm } from "@gold/form"
import { Shield } from "lucide-react"
import OtpDrawer from "../../components/otp-drawer"
import { useLogin } from "../../hooks/auth.hook"

const LoginView = () => {
  const {
    t,
    handlePhoneSubmit,
    phoneSchema,
    phoneDefaults,
    trustBadges,
    footerButtons,
    formatRequiredError,
    showWebAuthn,
    webAuthnBusy,
    scanClassName,
    scanIcon,
    scanTitle,
    scanHint,
    orPhoneLabel,
    handleWebAuthnLogin,
    otpDrawer,
  } = useLogin()

  return (
    <div className="aurum-login bg-background flex min-h-dvh flex-col px-6">
      <div className="aurum-login-enter flex flex-col items-center pt-16 pb-8">
        <div className="aurum-login-mark bg-accent text-accent-foreground mb-4 flex size-16 items-center justify-center rounded-(--radius) text-2xl font-bold">
          Ay
        </div>
        <Typography as="h1" size="display" weight="semibold" className="tracking-tight">
          {t("home.brand")}
        </Typography>
        <Typography size="sm" color="muted" className="mt-1">
          {t("auth.tagline")}
        </Typography>
      </div>

      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
        {showWebAuthn ? (
          <div className="aurum-login-enter aurum-login-enter-delay-1 mb-6">
            <div className="mb-6 flex flex-col items-center">
              <button
                type="button"
                className={scanClassName}
                onClick={handleWebAuthnLogin}
                disabled={webAuthnBusy}
                aria-label={scanTitle}
              >
                {scanIcon}
              </button>
              <Typography size="sm" weight="medium" className="mt-5">
                {scanTitle}
              </Typography>
              <Typography size="xs" weight="regular" color="muted" className="mt-1">
                {scanHint}
              </Typography>
            </div>

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <Typography
                as="span"
                size="xs"
                weight="regular"
                color="muted"
                className="text-[11px]"
              >
                {orPhoneLabel}
              </Typography>
              <Separator className="flex-1" />
            </div>
          </div>
        ) : null}

        <GeneratedForm
          fields={phoneSchema}
          defaultValues={phoneDefaults}
          footerButtons={footerButtons}
          formatRequiredError={formatRequiredError}
          className="aurum-login-enter aurum-login-enter-delay-1 flex flex-1 flex-col gap-6"
          footerClassName="aurum-login-enter aurum-login-enter-delay-2 mt-auto flex flex-col gap-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8"
          beforeFooter={
            <div className="flex flex-wrap items-center justify-center gap-2">
              {trustBadges.map((label) => (
                <div
                  key={label}
                  className="border-border/60 bg-foreground/5 flex items-center gap-1.5 rounded-full border px-2.5 py-1"
                >
                  <Shield size={10} className="text-foreground-muted" />
                  <Typography
                    as="span"
                    size="xs"
                    weight="regular"
                    color="muted"
                    className="text-[10px]"
                  >
                    {label}
                  </Typography>
                </div>
              ))}
            </div>
          }
          onSubmit={handlePhoneSubmit}
          sizes={{ input: "lg", button: "lg" }}
        />
      </div>

      <OtpDrawer {...otpDrawer} />
    </div>
  )
}

export default LoginView
