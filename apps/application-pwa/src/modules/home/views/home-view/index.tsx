import Typography from '@gold/shared-components/typography'
import { Link } from '@tanstack/react-router'
import PriceTag from '#/modules/shell/components/price-tag'
import HomeHeader from '../../components/home-header'
import HomeHero from '../../components/home-hero'
import { useHome } from '../../hooks/home.hook'

const HomeView = () => {
  const { t, header, quote, tradeActions, wallets, actions, markets, activity } = useHome()

  return (
    <div className="min-h-full pb-28">
      <div className="px-5 pt-12">
        <HomeHeader
          greeting={header.greeting}
          brandName={header.brandName}
          onOpenChart={header.onOpenChart}
        />
        <HomeHero quote={quote} tradeActions={tradeActions} />
      </div>

      <div className="mt-6 space-y-6 px-5">
        <div className="grid grid-cols-2 gap-3">
          {wallets.map((wallet) => (
            <article key={wallet.id} className="rounded-xl border border-border bg-surface-elevated p-4">
              <Typography as="p" size="xs" color="subtle" className="tracking-widest uppercase">
                {wallet.label}
              </Typography>
              <Typography as="p" size="md" weight="semibold" className="mt-2 font-mono">
                {wallet.value}
              </Typography>
              <Typography as="p" size="xs" color="subtle" className="mt-1">
                {wallet.hint}
              </Typography>
            </article>
          ))}
        </div>

        <div>
          <Typography as="h2" size="sm" weight="semibold" className="mb-3">
            {t('home.quickAccess')}
          </Typography>
          <div className="grid grid-cols-4 gap-3">
            {actions.map((action) => {
              const Icon = action.Icon

              return (
                <Link key={action.label} to={action.to} className="no-underline">
                  <span className={action.tileClassName}>
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <Typography as="span" size="xs" color="subtle" align="center" className="mt-2 block">
                    {action.label}
                  </Typography>
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <Typography as="h2" size="sm" weight="semibold" className="mb-3">
            {t('home.markets')}
          </Typography>
          <div className="space-y-2">
            {markets.map((row) => (
              <button key={row.id} type="button" onClick={row.onSelect} className={row.className}>
                <div>
                  <Typography as="p" size="sm" weight="medium">
                    {row.name}
                  </Typography>
                  <Typography as="p" size="xs" color="subtle">
                    {row.symbol}
                  </Typography>
                </div>
                <PriceTag value={row.price} change={row.change} size="sm" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <Typography as="h2" size="sm" weight="semibold" className="mb-3">
            {t('home.recentActivity')}
          </Typography>
          <div className="space-y-2">
            {activity.map((row) => (
              <div key={row.id} className={row.className}>
                <div>
                  <Typography as="p" size="sm" weight="medium" color={row.sideColor}>
                    {row.sideLabel}
                  </Typography>
                  <Typography as="p" size="xs" color="subtle">
                    {row.date}
                  </Typography>
                </div>
                <div className="text-end">
                  <Typography as="p" size="sm" weight="semibold" className="font-mono">
                    {row.ouncesLabel}
                  </Typography>
                  <Typography as="p" size="xs" color="subtle" className="font-mono">
                    {row.priceLabel}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeView
