import { Glass } from "glisse"
import Typography from "@gold/shared-components/typography"
import { useTwoFactor } from "#/modules/auth/hooks/two-factor.hook"
import GoldBadge from "#/modules/shell/components/gold-badge"
import Toggle from "#/modules/shell/components/toggle"

const TwoFactorRow = () => {
  const { t, twoFactorEnabled, handleTwoFactorChange, statusLabel } = useTwoFactor()

  return (
    <Glass className="rounded-xl">
      <div className="border-border/40 flex items-center justify-between rounded-xl border bg-transparent p-4">
        <div>
          <Typography size="sm">{t("options.twoFactor")}</Typography>
          <Typography size="xs" weight="regular" color="subtle">
            {t("options.twoFactorHint")}
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          {twoFactorEnabled ? <GoldBadge>{statusLabel}</GoldBadge> : null}
          <Toggle
            value={twoFactorEnabled}
            onChange={handleTwoFactorChange}
            label={t("options.twoFactor")}
          />
        </div>
      </div>
    </Glass>
  )
}

export default TwoFactorRow
