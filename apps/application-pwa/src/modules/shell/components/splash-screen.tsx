import Typography from '@gold/shared-components/typography'
import { useSplashScreen } from '../hooks/splash-screen.hook'

const SplashScreen = () => {
  const { isVisible, brandName, tagline, markLabel } = useSplashScreen()

  if (!isVisible) {
    return null
  }

  return (
    <div className="ayar-splash" role="status" aria-live="polite" aria-label={brandName}>
      <div className="ayar-splash__glow" aria-hidden="true" />
      <div className="ayar-splash__content">
        <div className="ayar-splash__mark" aria-hidden="true">
          {markLabel}
        </div>
        <Typography as="h1" size="xl" weight="semibold" align="center" className="ayar-splash__brand">
          {brandName}
        </Typography>
        <Typography size="sm" color="muted" align="center" className="ayar-splash__tagline">
          {tagline}
        </Typography>
      </div>
    </div>
  )
}

export default SplashScreen
