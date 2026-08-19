import Button from '@gold/shared-components/button'
import Input from '@gold/shared-components/input'
import Select from '@gold/shared-components/select'
import { ChevronRight } from 'lucide-react'
import Card from '#/modules/shell/components/card'
import GoldBadge from '#/modules/shell/components/gold-badge'
import ThemeSelector from '#/modules/shell/components/theme-selector'
import Toggle from '#/modules/shell/components/toggle'
import { useOptions } from '../../hooks/options.hook'

const OptionsView = () => {
  const {
    t,
    notifications,
    setNotifications,
    biometric,
    biometricHint,
    biometricIcon,
    isBiometricDisabled,
    handleBiometricToggle,
    isRtl,
    preference,
    handleThemeChange,
    handleDirectionChange,
    handleSaveAlert,
    savedAlerts,
    aboutItems,
    currency,
    currencySelectOptions,
    handleCurrencyChange,
  } = useOptions()

  return (
    <div className="min-h-screen pb-24">
      <div className="px-5 pt-12 pb-6">
        <h2 className="aurum-serif text-xl font-semibold text-foreground">{t('options.title')}</h2>
        <p className="mt-1 text-xs text-foreground-subtle">{t('options.subtitle')}</p>
      </div>

      <div className="space-y-5 px-5">
        <div>
          <p className="mb-2 text-xs tracking-widest text-foreground-subtle uppercase">
            {t('options.appearance')}
          </p>
          <div className="space-y-1">
            <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
              <div>
                <p className="text-sm text-foreground">{t('options.language')}</p>
                <p className="text-xs text-foreground-subtle">{t('options.languageHint')}</p>
              </div>
              <Toggle value={isRtl} onChange={handleDirectionChange} />
            </div>
            <div className="rounded-xl border border-border bg-surface-elevated p-4">
              <div className="mb-3">
                <p className="text-sm text-foreground">{t('options.theme')}</p>
                <p className="text-xs text-foreground-subtle">{t('options.themeHint')}</p>
              </div>
              <ThemeSelector value={preference} onChange={handleThemeChange} />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
              <div>
                <p className="text-sm text-foreground">{t('options.currency')}</p>
                <p className="text-xs text-foreground-subtle">{t('options.currencyHint')}</p>
              </div>
              <Select
                value={currency}
                onValueChange={handleCurrencyChange}
                options={currencySelectOptions}
                searchable
                title={t('options.currency')}
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs tracking-widest text-foreground-subtle uppercase">
            {t('options.notifications')}
          </p>
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
            <div>
              <p className="text-sm text-foreground">{t('options.pushNotifications')}</p>
              <p className="text-xs text-foreground-subtle">{t('options.pushHint')}</p>
            </div>
            <Toggle value={notifications} onChange={setNotifications} />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs tracking-widest text-foreground-subtle uppercase">
            {t('options.priceAlert')}
          </p>
          <Card>
            <p className="mb-3 text-sm text-foreground">{t('options.alertWhen')}</p>
            <div className="flex gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-surface-muted px-4 py-3">
                <span className="text-sm text-foreground-subtle">$</span>
                <Input
                  type="number"
                  value={['3,400']}
                  onValueChange={() => {
                    //
                  }}
                  className="border-0 bg-transparent p-0 font-mono text-sm shadow-none focus:ring-0"
                />
              </div>
              <Button
                type="button"
                className="rounded-xl px-4 py-3 text-sm"
                onClick={handleSaveAlert}
              >
                {t('options.set')}
              </Button>
            </div>
            <div className="mt-3 space-y-2">
              {savedAlerts.map((alert) => {
                const Icon = alert.icon

                return (
                  <div key={alert.price} className={alert.rowClassName}>
                    <div className="flex items-center gap-2">
                      <Icon size={12} className={alert.iconClassName} />
                      <span className="font-mono text-xs text-foreground">{alert.price}</span>
                      <span className="text-xs text-foreground-subtle">{alert.directionLabel}</span>
                    </div>
                    <button type="button" className="text-xs text-danger hover:opacity-70">
                      {t('options.remove')}
                    </button>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        <div>
          <p className="mb-2 text-xs tracking-widest text-foreground-subtle uppercase">
            {t('options.security')}
          </p>
          <div className="space-y-1">
            <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-600/10 text-gold-600">
                  {biometricIcon}
                </div>
                <div>
                  <p className="text-sm text-foreground">{t('options.biometric')}</p>
                  <p className="text-xs text-foreground-subtle">{biometricHint}</p>
                </div>
              </div>
              <Toggle
                value={biometric}
                onChange={handleBiometricToggle}
                disabled={isBiometricDisabled}
              />
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl border border-border bg-surface-elevated p-4 transition-all hover:border-gold-600/30"
            >
              <span className="text-sm text-foreground">{t('options.changePin')}</span>
              <ChevronRight size={14} className="gold-rtl-flip text-foreground-subtle" />
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl border border-border bg-surface-elevated p-4 transition-all hover:border-gold-600/30"
            >
              <span className="text-sm text-foreground">{t('options.twoFactor')}</span>
              <div className="flex items-center gap-2">
                <GoldBadge>{t('options.active')}</GoldBadge>
                <ChevronRight size={14} className="gold-rtl-flip text-foreground-subtle" />
              </div>
            </button>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs tracking-widest text-foreground-subtle uppercase">
            {t('options.about')}
          </p>
          <div className="space-y-1">
            {aboutItems.map((item) => (
              <button
                key={item}
                type="button"
                className="flex w-full items-center justify-between rounded-xl border border-border bg-surface-elevated p-4 transition-all hover:border-gold-600/30"
              >
                <span className="text-sm text-foreground">{item}</span>
                <ChevronRight size={14} className="gold-rtl-flip text-foreground-subtle" />
              </button>
            ))}
            <div className="p-4 text-center text-xs text-foreground-subtle">
              {t('options.footer')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OptionsView
