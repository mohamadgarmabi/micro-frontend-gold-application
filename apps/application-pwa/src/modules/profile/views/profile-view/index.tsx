import Avatar from '@gold/shared-components/avatar'
import Button from '@gold/shared-components/button'
import Typography from '@gold/shared-components/typography'
import { ChevronRight, LogOut, Star } from 'lucide-react'
import Card from '#/modules/shell/components/card'
import GoldBadge from '#/modules/shell/components/gold-badge'
import { useProfile } from '../../hooks/profile.hook'

const ProfileView = () => {
  const { t, BalanceIcon, toggleBalance, signOut, balanceLabel, holdings, menuItems } = useProfile()

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-b from-gold-600/8 to-transparent px-5 pt-12 pb-8">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 rounded-2xl bg-button text-xl font-bold text-button-foreground">
            <Avatar.Fallback>MC</Avatar.Fallback>
          </Avatar>
          <div>
            <Typography as="h2" size="xl" weight="semibold" className="aurum-serif">
              Marcus Chen
            </Typography>
            <Typography size="sm" color="subtle">
              marcus@example.com
            </Typography>
            <GoldBadge className="mt-1">
              <Star size={10} />
              {t('profile.premium')}
            </GoldBadge>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5">
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <Typography size="xs" weight="regular" color="subtle" className="tracking-widest uppercase">
              {t('profile.cashBalance')}
            </Typography>
            <button
              type="button"
              onClick={toggleBalance}
              className="text-foreground-subtle transition-colors hover:text-foreground"
            >
              <BalanceIcon size={14} />
            </button>
          </div>
          <Typography size="display" weight="medium" className="font-mono">
            {balanceLabel}
          </Typography>
          <Typography size="xs" weight="regular" color="subtle" className="mt-1">
            {t('profile.availableToTrade')}
          </Typography>
        </Card>

        <Card>
          <Typography
            size="xs"
            weight="regular"
            color="subtle"
            className="mb-3 tracking-widest uppercase"
          >
            {t('profile.holdings')}
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            {holdings.map((item) => (
              <div key={item.label}>
                <Typography size="xs" weight="regular" color="subtle" className="mb-1">
                  {item.label}
                </Typography>
                <Typography size="sm" weight="medium" className="font-mono">
                  {item.value}
                </Typography>
                <Typography size="xs" weight="regular" color="brand">
                  {item.sub}
                </Typography>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.id}
                type="button"
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface-elevated p-4 transition-all duration-200 hover:border-gold-600/30"
              >
                <span className="text-gold-600">
                  <Icon size={16} />
                </span>
                <Typography as="span" size="sm" className="flex-1 text-start">
                  {item.label}
                </Typography>
                <Typography as="span" size="xs" weight="regular" color="subtle">
                  {item.sub}
                </Typography>
                <ChevronRight size={14} className="gold-rtl-flip text-foreground-subtle" />
              </button>
            )
          })}
        </div>

        <Button
          type="button"
          onClick={signOut}
          className="flex w-full items-center justify-start gap-3 rounded-xl border border-border bg-surface-elevated p-4 text-danger hover:border-danger/30 hover:bg-danger-muted"
        >
          <LogOut size={16} />
          <Typography as="span" size="sm" color="danger">
            {t('profile.signOut')}
          </Typography>
        </Button>
      </div>
    </div>
  )
}

export default ProfileView
