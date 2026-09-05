import Button from '@gold/shared-components/button'
import Input from '@gold/shared-components/input'
import Select from '@gold/shared-components/select'
import Typography from '@gold/shared-components/typography'
import { ChevronRight } from 'lucide-react'
import Card from '#/modules/shell/components/card'
import ThemeSelector from '#/modules/shell/components/theme-selector'
import Toggle from '#/modules/shell/components/toggle'
import PinDrawer from '../../components/pin-drawer'
import TwoFactorRow from '../../components/two-factor-row'
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
    handleViewTransitionChange,
    viewTransitionEnabled,
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
        <Typography as="h2" size="xl" weight="semibold" className="aurum-serif">
          {t('options.title')}
        </Typography>
        <Typography size="xs" weight="regular" color="subtle" className="mt-1">
          {t('options.subtitle')}
        </Typography>
      </div>

      <div className="space-y-5 px-5">
        <div>
          <Typography
            size="xs"
            weight="regular"
            color="subtle"
            className="mb-2 tracking-widest uppercase"
          >
            {t('options.appearance')}
          </Typography>
          <div className="space-y-1">
            <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
              <div>
                <Typography size="sm">{t('options.language')}</Typography>
                <Typography size="xs" weight="regular" color="subtle">
                  {t('options.languageHint')}
                </Typography>
              </div>
              <Toggle value={isRtl} onChange={handleDirectionChange} />
            </div>
            <div className="rounded-xl border border-border bg-surface-elevated p-4">
              <div className="mb-3">
                <Typography size="sm">{t('options.theme')}</Typography>
                <Typography size="xs" weight="regular" color="subtle">
                  {t('options.themeHint')}
                </Typography>
              </div>
              <ThemeSelector value={preference} onChange={handleThemeChange} />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
              <div>
                <Typography size="sm">{t('options.viewTransition')}</Typography>
                <Typography size="xs" weight="regular" color="subtle">
                  {t('options.viewTransitionHint')}
                </Typography>
              </div>
              <Toggle value={viewTransitionEnabled} onChange={handleViewTransitionChange} />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
              <div>
                <Typography size="sm">{t('options.currency')}</Typography>
                <Typography size="xs" weight="regular" color="subtle">
                  {t('options.currencyHint')}
                </Typography>
              </div>
              <Select
                value={currency}
                onValueChange={handleCurrencyChange}
                options={currencySelectOptions}
                searchable
                className="mx-auto"
                title={t('options.currency')}
              />
            </div>
          </div>
        </div>

        <div>
          <Typography
            size="xs"
            weight="regular"
            color="subtle"
            className="mb-2 tracking-widest uppercase"
          >
            {t('options.notifications')}
          </Typography>
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
            <div>
              <Typography size="sm">{t('options.pushNotifications')}</Typography>
              <Typography size="xs" weight="regular" color="subtle">
                {t('options.pushHint')}
              </Typography>
            </div>
            <Toggle value={notifications} onChange={setNotifications} />
          </div>
        </div>

        <div>
          <Typography
            size="xs"
            weight="regular"
            color="subtle"
            className="mb-2 tracking-widest uppercase"
          >
            {t('options.priceAlert')}
          </Typography>
          <Card>
            <Typography size="sm" className="mb-3">
              {t('options.alertWhen')}
            </Typography>
            <div className="flex gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-surface-muted px-4 py-3">
                <Typography as="span" size="sm" color="subtle">
                  $
                </Typography>
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
                      <Typography as="span" size="xs" weight="regular" className="font-mono">
                        {alert.price}
                      </Typography>
                      <Typography as="span" size="xs" weight="regular" color="subtle">
                        {alert.directionLabel}
                      </Typography>
                    </div>
                    <button type="button" className="hover:opacity-70">
                      <Typography as="span" size="xs" weight="regular" color="danger">
                        {t('options.remove')}
                      </Typography>
                    </button>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        <div>
          <Typography
            size="xs"
            weight="regular"
            color="subtle"
            className="mb-2 tracking-widest uppercase"
          >
            {t('options.security')}
          </Typography>
          <div className="space-y-1">
            <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-600/10 text-gold-600">
                  {biometricIcon}
                </div>
                <div>
                  <Typography size="sm">{t('options.biometric')}</Typography>
                  <Typography size="xs" weight="regular" color="subtle">
                    {biometricHint}
                  </Typography>
                </div>
              </div>
              <Toggle
                value={biometric}
                onChange={handleBiometricToggle}
                disabled={isBiometricDisabled}
              />
            </div>
            <PinDrawer />
            <TwoFactorRow />
          </div>
        </div>

        <div>
          <Typography
            size="xs"
            weight="regular"
            color="subtle"
            className="mb-2 tracking-widest uppercase"
          >
            {t('options.about')}
          </Typography>
          <div className="space-y-1">
            {aboutItems.map((item) => (
              <button
                key={item}
                type="button"
                className="flex w-full items-center justify-between rounded-xl border border-border bg-surface-elevated p-4 transition-all hover:border-gold-600/30"
              >
                <Typography as="span" size="sm">
                  {item}
                </Typography>
                <ChevronRight size={14} className="gold-rtl-flip text-foreground-subtle" />
              </button>
            ))}
            <Typography size="xs" weight="regular" color="subtle" align="center" className="p-4">
              {t('options.footer')}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OptionsView
