import Avatar from '@gold/shared-components/avatar'
import Button from '@gold/shared-components/button'
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
            <h2 className="aurum-serif text-xl font-semibold text-foreground">Marcus Chen</h2>
            <p className="text-sm text-foreground-subtle">marcus@example.com</p>
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
            <p className="text-xs tracking-widest text-foreground-subtle uppercase">
              {t('profile.cashBalance')}
            </p>
            <button
              type="button"
              onClick={toggleBalance}
              className="text-foreground-subtle transition-colors hover:text-foreground"
            >
              <BalanceIcon size={14} />
            </button>
          </div>
          <p className="font-mono text-3xl font-medium text-foreground">{balanceLabel}</p>
          <p className="mt-1 text-xs text-foreground-subtle">{t('profile.availableToTrade')}</p>
        </Card>

        <Card>
          <p className="mb-3 text-xs tracking-widest text-foreground-subtle uppercase">
            {t('profile.holdings')}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {holdings.map((item) => (
              <div key={item.label}>
                <p className="mb-1 text-xs text-foreground-subtle">{item.label}</p>
                <p className="font-mono text-sm font-medium text-foreground">{item.value}</p>
                <p className="text-xs text-gold-600">{item.sub}</p>
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
                <span className="flex-1 text-start text-sm text-foreground">{item.label}</span>
                <span className="text-xs text-foreground-subtle">{item.sub}</span>
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
          <span className="text-sm">{t('profile.signOut')}</span>
        </Button>
      </div>
    </div>
  )
}

export default ProfileView
