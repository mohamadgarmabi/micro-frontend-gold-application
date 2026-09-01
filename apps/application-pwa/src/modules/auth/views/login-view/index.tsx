import Card from '@gold/shared-components/card'
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
    <div className="flex flex-col bg-background min-h-screen aurum-gradient-bg">
      <div className="flex flex-col flex-1 justify-center items-center px-6 pt-16 pb-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex justify-center items-center bg-accent shadow-sm mb-4 rounded-[var(--radius)] size-16 font-bold text-2xl text-accent-foreground">
            Ay
          </div>
          <h1 className="font-semibold text-foreground text-3xl tracking-tight">
            {t('home.brand')}
          </h1>
          <p className="mt-1 text-muted text-sm">{t('auth.tagline')}</p>
        </div>

        <Card className="p-6 w-full max-w-sm aurum-login-card">
          {showWebAuthn ? (
            <>
              <div className="flex flex-col items-center mb-6">
                <button
                  type="button"
                  className={scanClassName}
                  onClick={handleWebAuthnLogin}
                  disabled={webAuthnBusy}
                  aria-label={scanTitle}
                >
                  {scanIcon}
                </button>
                <p className="mt-5 font-medium text-foreground text-sm">{scanTitle}</p>
                <p className="mt-1 text-muted text-xs">{scanHint}</p>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <Separator className="flex-1" />
                <span className="text-[11px] text-muted">{orPasswordLabel}</span>
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
        </Card>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2 px-6 pb-10">
        {trustBadges.map((label) => (
          <div
            key={label}
            className="flex items-center gap-1.5 bg-surface px-2.5 py-1 border border-border rounded-full text-[10px] text-muted"
          >
            <Shield size={10} className="text-foreground" />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoginView
