import Select from "@gold/shared-components/select"
import SwipeRow from "@gold/shared-components/swipe-row"
import Typography from "@gold/shared-components/typography"
import { Button, Glass, Input } from "glisse"
import { ChevronRight } from "lucide-react"
import Card from "#/modules/shell/components/card"
import Toggle from "#/modules/shell/components/toggle"
import ThemeSelector from "#/modules/shell/components/theme-selector"
import GlassSettingsDrawer from "../../components/glass-settings-drawer"
import PinDrawer from "../../components/pin-drawer"
import TwoFactorRow from "../../components/two-factor-row"
import { useOptions } from "../../hooks/options.hook"

const OptionsView = () => {
  const {
    t,
    notifications,
    handleNotificationsChange,
    biometric,
    biometricHint,
    biometricIcon,
    isBiometricDisabled,
    handleBiometricSelect,
    direction,
    directionSelectOptions,
    preference,
    handleThemeChange,
    handleDirectionChange,
    handleViewTransitionChange,
    viewTransitionEnabled,
    priceAlert,
    setPriceAlert,
    handleSaveAlert,
    savedAlerts,
    aboutItems,
    currency,
    currencySelectOptions,
    handleCurrencyChange,
  } = useOptions()

  return (
    <div className="min-h-screen pb-24 lg:mx-auto lg:max-w-2xl lg:pb-10">
      <div className="px-5 pt-12 pb-6">
        <Typography as="h2" size="xl" weight="semibold" className="aurum-serif">
          {t("options.title")}
        </Typography>
        <Typography size="xs" weight="regular" color="subtle" className="mt-1">
          {t("options.subtitle")}
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
            {t("options.appearance")}
          </Typography>
          <div className="space-y-1">
            <Glass className="rounded-xl">
              <div className="border-border/40 flex items-center justify-between rounded-xl border bg-transparent p-4">
                <div>
                  <Typography size="sm">{t("options.language")}</Typography>
                  <Typography size="xs" weight="regular" color="subtle">
                    {t("options.languageHint")}
                  </Typography>
                </div>
                <Select
                  fit
                  forceSheet
                  searchable={false}
                  value={direction}
                  onValueChange={handleDirectionChange}
                  options={directionSelectOptions}
                  title={t("options.language")}
                />
              </div>
            </Glass>
            <Glass className="rounded-xl">
              <div className="border-border/40 rounded-xl border bg-transparent p-4">
                <div className="mb-3">
                  <Typography size="sm">{t("options.theme")}</Typography>
                  <Typography size="xs" weight="regular" color="subtle">
                    {t("options.themeHint")}
                  </Typography>
                </div>
                <ThemeSelector value={preference} onChange={handleThemeChange} />
              </div>
            </Glass>
            <Glass className="rounded-xl">
              <div className="border-border/40 flex items-center justify-between rounded-xl border bg-transparent p-4">
                <div>
                  <Typography size="sm">{t("options.viewTransition")}</Typography>
                  <Typography size="xs" weight="regular" color="subtle">
                    {t("options.viewTransitionHint")}
                  </Typography>
                </div>
                <Toggle
                  value={viewTransitionEnabled}
                  onChange={handleViewTransitionChange}
                  label={t("options.viewTransition")}
                />
              </div>
            </Glass>
            <GlassSettingsDrawer />
            <Glass className="rounded-xl">
              <div className="border-border/40 flex items-center justify-between rounded-xl border bg-transparent p-4">
                <div>
                  <Typography size="sm">{t("options.currency")}</Typography>
                  <Typography size="xs" weight="regular" color="subtle">
                    {t("options.currencyHint")}
                  </Typography>
                </div>
                <Select
                  fit
                  forceSheet
                  value={currency}
                  onValueChange={handleCurrencyChange}
                  options={currencySelectOptions}
                  searchable
                  title={t("options.currency")}
                />
              </div>
            </Glass>
          </div>
        </div>

        <div>
          <Typography
            size="xs"
            weight="regular"
            color="subtle"
            className="mb-2 tracking-widest uppercase"
          >
            {t("options.notifications")}
          </Typography>
          <Glass className="rounded-xl">
            <div className="border-border/40 flex items-center justify-between rounded-xl border bg-transparent p-4">
              <div>
                <Typography size="sm">{t("options.pushNotifications")}</Typography>
                <Typography size="xs" weight="regular" color="subtle">
                  {t("options.pushHint")}
                </Typography>
              </div>
              <Toggle
                value={notifications}
                onChange={handleNotificationsChange}
                label={t("options.pushNotifications")}
              />
            </div>
          </Glass>
        </div>

        <div>
          <Typography
            size="xs"
            weight="regular"
            color="subtle"
            className="mb-2 tracking-widest uppercase"
          >
            {t("options.priceAlert")}
          </Typography>
          <Card className="p-4">
            <Typography size="sm" className="mb-3">
              {t("options.alertWhen")}
            </Typography>
            <div className="flex gap-2">
              <Input
                inputMode="decimal"
                aria-label={t("options.alertWhen")}
                icon={<span>$</span>}
                value={priceAlert}
                onValueChange={setPriceAlert}
                className="flex-1 font-mono"
              />
              <Button type="button" variant="filled" onClick={handleSaveAlert}>
                {t("options.set")}
              </Button>
            </div>
            <div className="mt-3 space-y-2">
              {savedAlerts.map((alert) => {
                const Icon = alert.icon

                return (
                  <SwipeRow
                    key={alert.id}
                    label={alert.label}
                    direction={alert.swipeDirection}
                    actions={alert.swipeActions}
                    onCommit={alert.onCommit}
                    height={48}
                    radius={12}
                    actionWidth={72}
                    rowColor={alert.swipeTheme.rowColor}
                    drawerColor={alert.swipeTheme.drawerColor}
                    textColor={alert.swipeTheme.textColor}
                    actionColor={alert.swipeTheme.actionColor}
                  >
                    <div className={alert.contentClassName}>
                      <Icon size={12} className={alert.iconClassName} />
                      <Typography as="span" size="xs" weight="regular" className="font-mono">
                        {alert.price}
                      </Typography>
                      <Typography as="span" size="xs" weight="regular" color="subtle">
                        {alert.directionLabel}
                      </Typography>
                    </div>
                  </SwipeRow>
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
            {t("options.security")}
          </Typography>
          <div className="space-y-1">
            <Glass className="rounded-xl">
              <div className="border-border/40 flex items-center justify-between rounded-xl border bg-transparent p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gold-600/10 text-gold-600 flex h-10 w-10 items-center justify-center rounded-full">
                    {biometricIcon}
                  </div>
                  <div>
                    <Typography size="sm">{t("options.biometric")}</Typography>
                    <Typography size="xs" weight="regular" color="subtle">
                      {biometricHint}
                    </Typography>
                  </div>
                </div>
                <Toggle
                  value={biometric}
                  onChange={handleBiometricSelect}
                  label={t("options.biometric")}
                  disabled={isBiometricDisabled}
                />
              </div>
            </Glass>
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
            {t("options.about")}
          </Typography>
          <div className="space-y-1">
            {aboutItems.map((item) => (
              <Glass key={item} className="rounded-xl">
                <button
                  type="button"
                  className="border-border/40 hover:border-gold-600/30 flex w-full items-center justify-between rounded-xl border bg-transparent p-4 transition-all"
                >
                  <Typography as="span" size="sm">
                    {item}
                  </Typography>
                  <ChevronRight size={14} className="gold-rtl-flip text-foreground-subtle" />
                </button>
              </Glass>
            ))}
            <Typography size="xs" weight="regular" color="subtle" align="center" className="p-4">
              {t("options.footer")}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OptionsView
