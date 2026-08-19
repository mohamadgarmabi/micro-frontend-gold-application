import Separator from '@gold/shared-components/separator'
import { GeneratedForm } from '@gold/form'
import { Shield } from 'lucide-react'
import { useLogin } from '../../hooks/auth.hook'

const LoginView = () => {
  const {
    t,
    handlePasswordSignIn,
    passwordSchema,
    passwordDefaults,
    trustBadges,
    footerButtons,
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
    <div className="aurum-gradient-bg flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-16 pb-8">
        <div className="mb-8 flex flex-col items-center">
          <div className="aurum-mark mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-button text-button-foreground">
            <span className="aurum-serif text-2xl font-bold">Au</span>
          </div>
          <h1 className="aurum-serif text-3xl font-semibold tracking-tight text-foreground">
            Aurum
          </h1>
          <p className="mt-1 text-sm text-foreground-subtle">{t('auth.tagline')}</p>
        </div>

        <div className="aurum-login-card w-full max-w-sm rounded-3xl p-6">
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
                <p className="mt-5 text-sm font-medium text-foreground">{scanTitle}</p>
                <p className="mt-1 text-xs text-foreground-subtle">{scanHint}</p>
              </div>

              <div className="mb-5 flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-[11px] text-foreground-subtle">{orPasswordLabel}</span>
                <Separator className="flex-1" />
              </div>
            </>
          ) : null}

          <GeneratedForm
            fields={passwordSchema}
            defaultValues={passwordDefaults}
            footerButtons={footerButtons}
            className="space-y-4"
            onSubmit={handlePasswordSignIn}
            sizes={{ input: 'lg', button: 'lg' }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 px-6 pb-10">
        {trustBadges.map((label) => (
          <div
            key={label}
            className="flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated/70 px-2.5 py-1 text-[10px] text-foreground-subtle backdrop-blur-sm"
          >
            <Shield size={10} className="text-gold-600" />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoginView
