import Typography from '@gold/shared-components/typography'
import { Link } from '@tanstack/react-router'
import HomeHeader from '../../components/home-header'
import HomeHero from '../../components/home-hero'
import { useHome } from '../../hooks/home.hook'

const HomeView = () => {
  const { t, header, assetTabs, hero, gaugeTicks, statusCards, actions } = useHome()

  return (
    <div className="pb-28 min-h-screen">
      <div className="px-5 pt-12 pb-4">
        <HomeHeader
          brandName={header.brandName}
          dateLabel={header.dateLabel}
          streakLabel={header.streakLabel}
          onOpenCalendar={header.onOpenCalendar}
        />

        <div className="flex gap-2 mb-4">
          {assetTabs.map((tab) => (
            <button key={tab.id} type="button" onClick={tab.onSelect} className={tab.className}>
              {tab.label}
            </button>
          ))}
        </div>

        <HomeHero hero={hero} gaugeTicks={gaugeTicks} />
      </div>

      <div className="space-y-6 px-5">
        <div className="gap-3 grid grid-cols-2">
          {statusCards.map((card) => {
            const BadgeIcon = card.BadgeIcon

            return (
              <article key={card.id} className="aurum-glass-card">
                <div className="flex justify-between items-center gap-2">
                  <Typography
                    as="span"
                    size="xs"
                    weight="medium"
                    color="brand"
                    className="bg-brand/10 px-2 py-0.5 rounded-full text-[10px]"
                  >
                    {card.title}
                  </Typography>
                  <Typography as="span" size="xs" color="subtle" className="text-[10px]">
                    {card.when}
                  </Typography>
                </div>
                <Typography as="p" size="lg" weight="semibold" className="mt-4 font-mono">
                  {card.value}
                </Typography>
                <Typography as="p" size="xs" color="subtle" className="mt-0.5">
                  {card.hint}
                </Typography>
                <Typography as="span" size="xs" className={card.badgeClassName}>
                  <BadgeIcon size={12} />
                  {card.badgeLabel}
                </Typography>
              </article>
            )
          })}
        </div>

        <div>
          <Typography as="h2" size="sm" weight="semibold" className="mb-3">
            {t('home.quickAccess')}
          </Typography>
          <div className="flex gap-3 pb-1 overflow-x-auto">
            {actions.map((action) => {
              const Icon = action.Icon

              return (
                <Link key={action.label} to={action.to} className="no-underline">
                  <span className={action.tileClassName}>
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <Typography
                    as="span"
                    size="xs"
                    color="subtle"
                    align="center"
                    className="block mt-2 text-[10px]"
                  >
                    {action.label}
                  </Typography>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeView
