import Avatar from "@gold/shared-components/avatar"
import Typography from "@gold/shared-components/typography"
import { Button, Glass } from "glisse"
import { ChevronRight, LogOut, Star } from "lucide-react"
import Card from "#/modules/shell/components/card"
import GoldBadge from "#/modules/shell/components/gold-badge"
import { useProfile } from "../../hooks/profile.hook"

const ProfileView = () => {
  const {
    t,
    BalanceIcon,
    toggleBalance,
    balanceToggleLabel,
    showBalance,
    signOut,
    balanceLabel,
    holdings,
    menuItems,
  } = useProfile()

  return (
    <div className="min-h-screen pb-24 lg:mx-auto lg:max-w-2xl lg:pb-10">
      <div className="from-gold-600/8 bg-gradient-to-b to-transparent px-5 pt-12 pb-8">
        <div className="flex items-center gap-4">
          <Avatar className="bg-button text-button-foreground size-16 rounded-2xl text-xl font-bold">
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
              {t("profile.premium")}
            </GoldBadge>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5">
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <Typography
              size="xs"
              weight="regular"
              color="subtle"
              className="tracking-widest uppercase"
            >
              {t("profile.cashBalance")}
            </Typography>
            <button
              type="button"
              onClick={toggleBalance}
              aria-label={balanceToggleLabel}
              aria-pressed={!showBalance}
              className="text-foreground-subtle hover:text-foreground -m-3 flex size-11 cursor-pointer items-center justify-center transition-colors"
            >
              <BalanceIcon size={16} />
            </button>
          </div>
          <Typography size="display" weight="medium" className="font-mono">
            {balanceLabel}
          </Typography>
          <Typography size="xs" weight="regular" color="subtle" className="mt-1">
            {t("profile.availableToTrade")}
          </Typography>
        </Card>

        <Card>
          <Typography
            size="xs"
            weight="regular"
            color="subtle"
            className="mb-3 tracking-widest uppercase"
          >
            {t("profile.holdings")}
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
              <Glass key={item.id} className="rounded-xl">
                <button
                  type="button"
                  onClick={item.onSelect}
                  className="border-border/40 hover:border-gold-600/30 flex w-full cursor-pointer items-center gap-3 rounded-xl border bg-transparent p-4 transition-all duration-200"
                >
                  <span className="text-gold-600" aria-hidden="true">
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
              </Glass>
            )
          })}
        </div>

        <Button
          type="button"
          destructive
          icon={<LogOut size={16} />}
          onClick={signOut}
          className="h-14! w-full justify-start! rounded-xl!"
        >
          {t("profile.signOut")}
        </Button>
      </div>
    </div>
  )
}

export default ProfileView
