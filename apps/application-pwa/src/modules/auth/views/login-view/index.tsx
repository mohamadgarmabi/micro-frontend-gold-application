import Button from '@gold/shared-components/button'
import Input from '@gold/shared-components/input'
import Separator from '@gold/shared-components/separator'
import { GeneratedForm } from '@gold/form'
import { Fingerprint, Shield } from 'lucide-react'
import { useLogin } from '../../hooks/auth.hook'

const LoginView = () => {
  const {
    t,
    phone,
    setPhone,
    cc,
    handleCountryChange,
    canSubmit,
    goToOtp,
    countryCodes,
    passwordSchema,
    passwordDefaults,
    trustBadges,
    footerButtons,
    showWebAuthn,
    webAuthnBusy,
    handleWebAuthnLogin,
  } = useLogin()

  return (
    <div className="aurum-gradient-bg flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-20 pb-8">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-button text-button-foreground shadow-lg">
            <span className="aurum-serif text-2xl font-bold">Au</span>
          </div>
          <h1 className="aurum-serif text-3xl font-semibold tracking-tight text-foreground">
            Aurum
          </h1>
          <p className="mt-1 text-sm text-foreground-subtle">{t('auth.tagline')}</p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          {showWebAuthn ? (
            <>
              <Button
                type="button"
                onClick={handleWebAuthnLogin}
                loading={webAuthnBusy}
                leftIcon={<Fingerprint />}
                className="w-full rounded-xl py-3.5 shadow-lg shadow-neutral-900/10 disabled:shadow-none dark:shadow-white/10"
              >
                {t('auth.webauthn')}
              </Button>

              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs text-foreground-subtle">{t('auth.or')}</span>
                <Separator className="flex-1" />
              </div>
            </>
          ) : null}

          <div>
            <label className="mb-2 block text-xs tracking-widest text-foreground-subtle uppercase">
              {t('auth.mobileNumber')}
            </label>
            <div className="flex gap-2">
              <select
                value={cc}
                onChange={handleCountryChange}
                className="w-20 rounded-lg border border-border bg-surface px-2 py-3 font-mono text-sm text-foreground transition-colors focus:border-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-600/20"
              >
                {countryCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              <Input
                type="tel"
                placeholder="(555) 000-0000"
                value={phone}
                onValueChange={setPhone}
                className="flex-1"
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={goToOtp}
            disabled={!canSubmit}
            className="w-full rounded-xl py-3.5 shadow-lg shadow-neutral-900/10 disabled:shadow-none dark:shadow-white/10"
          >
            {t('auth.sendOtp')}
          </Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-foreground-subtle">{t('auth.or')}</span>
            <Separator className="flex-1" />
          </div>

          <GeneratedForm
            fields={passwordSchema}
            defaultValues={passwordDefaults}
            footerButtons={footerButtons}
            className="space-y-4"
            onSubmit={goToOtp}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 px-6 pb-10">
        {trustBadges.map((label) => (
          <div key={label} className="flex items-center gap-1 text-[10px] text-foreground-subtle">
            <Shield size={10} className="text-gold-600" />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoginView
