import { Glass } from "glisse"
import Select from "@gold/shared-components/select"
import Typography from "@gold/shared-components/typography"
import { useTwoFactor } from "#/modules/auth/hooks/two-factor.hook"
import GoldBadge from "#/modules/shell/components/gold-badge"

const TwoFactorRow = () => {
  const { t, twoFactorEnabled, handleTwoFactorChange, statusLabel } = useTwoFactor()

  const booleanSelectOptions = [
    { value: "on", label: t("options.active") },
    { value: "off", label: t("options.inactive") },
  ]

  const handleSelect = (next: string | string[]) => {
    if (typeof next !== "string") {
      return
    }

    handleTwoFactorChange(next === "on")
  }

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
          <Select
            fit
            forceSheet
            searchable={false}
            value={twoFactorEnabled ? "on" : "off"}
            onValueChange={handleSelect}
            options={booleanSelectOptions}
            title={t("options.twoFactor")}
          />
        </div>
      </div>
    </Glass>
  )
}

export default TwoFactorRow
