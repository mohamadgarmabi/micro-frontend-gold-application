import Card from "@gold/shared-components/card"
import Separator from "@gold/shared-components/separator"
import Typography from "@gold/shared-components/typography"
import { GeneratedForm } from "@gold/form"
import { Shield } from "lucide-react"
import { useLogin } from "../../hooks/auth.hook"

const LoginView = () => {
  const {
    t,
    handlePasswordSignIn,
    passwordSchema,
    passwordDefaults,
    trustBadges,
    footerButtons,
    formatRequiredError,
    showWebAuthn,
    webAuthnBusy,
    scanClassName,
    scanIcon,
    scanTitle,
    scanHint,
    orPasswordLabel,
    handleWebAuthnLogin,
  } = useLogin()

  return (
    <div className="bg-background aurum-gradient-bg flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-16 pb-8">
        <div className="mb-8 flex flex-col items-center">
          <div className="bg-accent text-accent-foreground mb-4 flex size-16 items-center justify-center rounded-[var(--radius)] text-2xl font-bold shadow-sm">
            Ay
          </div>
          <Typography as="h1" size="display" weight="semibold" className="tracking-tight">
            {t("home.brand")}
          </Typography>
          <Typography size="sm" color="muted" className="mt-1">
            {t("auth.tagline")}
          </Typography>
        </div>

        <Card className="aurum-login-card w-full max-w-sm p-6">
          {showWebAuthn ? (
            <>
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

              <div className="mb-5 flex items-center gap-3">
                <Separator className="flex-1" />
                <Typography
                  as="span"
                  size="xs"
                  weight="regular"
                  color="muted"
                  className="text-[11px]"
                >
                  {orPasswordLabel}
                </Typography>
                <Separator className="flex-1" />
              </div>
            </>
          ) : null}

          <GeneratedForm
            fields={passwordSchema}
            defaultValues={passwordDefaults}
            footerButtons={footerButtons}
            formatRequiredError={formatRequiredError}
            className="space-y-4"
            onSubmit={handlePasswordSignIn}
            sizes={{ input: "lg", button: "lg" }}
          />
        </Card>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 px-6 pb-10">
        {trustBadges.map((label) => (
          <div
            key={label}
            className="bg-surface border-border flex items-center gap-1.5 rounded-full border px-2.5 py-1"
          >
            <Shield size={10} className="text-foreground" />
            <Typography as="span" size="xs" weight="regular" color="muted" className="text-[10px]">
              {label}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoginView
