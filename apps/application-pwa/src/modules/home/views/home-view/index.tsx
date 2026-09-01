import Card from '@gold/shared-components/card'
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
            <Card key={wallet.id} className="p-4">
              <p className="text-xs uppercase tracking-widest text-muted">{wallet.label}</p>
              <p className="mt-2 font-mono text-base font-semibold text-foreground">
                {wallet.value}
              </p>
              <p className="mt-1 text-xs text-muted">{wallet.hint}</p>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold text-foreground">{t('home.quickAccess')}</h2>
          <div className="grid grid-cols-4 gap-3">
            {actions.map((action) => {
              const Icon = action.Icon

              return (
                <Link key={action.label} to={action.to} className="no-underline">
                  <span className={action.tileClassName}>
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <span className="mt-2 block text-center text-xs text-muted">{action.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold text-foreground">{t('home.markets')}</h2>
          <div className="space-y-2">
            {markets.map((row) => (
              <button key={row.id} type="button" onClick={row.onSelect} className={row.className}>
                <div>
                  <p className="text-sm font-medium text-foreground">{row.name}</p>
                  <p className="text-xs text-muted">{row.symbol}</p>
                </div>
                <PriceTag value={row.price} change={row.change} size="sm" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold text-foreground">{t('home.recentActivity')}</h2>
          <div className="space-y-2">
            {activity.map((row) => (
              <div key={row.id} className={row.className}>
                <div>
                  <p className={`text-sm font-medium ${row.sideColorClassName}`}>{row.sideLabel}</p>
                  <p className="text-xs text-muted">{row.date}</p>
                </div>
                <div className="text-end">
                  <p className="font-mono text-sm font-semibold text-foreground">{row.ouncesLabel}</p>
                  <p className="font-mono text-xs text-muted">{row.priceLabel}</p>
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
