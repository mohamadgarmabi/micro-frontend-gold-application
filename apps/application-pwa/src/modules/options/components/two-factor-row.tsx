import Typography from '@gold/shared-components/typography'
import GoldBadge from '#/modules/shell/components/gold-badge'
import Toggle from '#/modules/shell/components/toggle'
import { useTwoFactor } from '#/modules/auth/hooks/two-factor.hook'

const TwoFactorRow = () => {
  const { t, twoFactorEnabled, handleTwoFactorChange, statusLabel } = useTwoFactor()

  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
      <div>
        <Typography size="sm">{t('options.twoFactor')}</Typography>
        <Typography size="xs" weight="regular" color="subtle">
          {t('options.twoFactorHint')}
        </Typography>
      </div>
      <div className="flex items-center gap-2">
        {twoFactorEnabled ? <GoldBadge>{statusLabel}</GoldBadge> : null}
        <Toggle value={twoFactorEnabled} onChange={handleTwoFactorChange} />
      </div>
    </div>
  )
}

export default TwoFactorRow
