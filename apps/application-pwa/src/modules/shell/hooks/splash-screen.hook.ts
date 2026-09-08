import { useEffect, useState } from 'react'
import {
  SPLASH_FADE_DURATION_MS,
  SPLASH_MARK_LABEL,
  SPLASH_MIN_DURATION_MS,
} from '#/config/splash.constants'
import { useI18n } from './i18n.hook'

const useSplashScreen = () => {
  const { t } = useI18n()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let cancelled = false
    let fadeTimer: number | undefined
    let hideTimer: number | undefined
    const startedAt = Date.now()

    const dismiss = () => {
      const remaining = Math.max(0, SPLASH_MIN_DURATION_MS - (Date.now() - startedAt))

      hideTimer = window.setTimeout(() => {
        if (cancelled) {
          return
        }

        document.documentElement.classList.add('ayar-splash-done')

        fadeTimer = window.setTimeout(() => {
          if (!cancelled) {
            setIsVisible(false)
          }
        }, SPLASH_FADE_DURATION_MS)
      }, remaining)
    }

    if (document.readyState === 'complete') {
      dismiss()
    } else {
      window.addEventListener('load', dismiss, { once: true })
    }

    return () => {
      cancelled = true
      window.removeEventListener('load', dismiss)
      window.clearTimeout(hideTimer)
      window.clearTimeout(fadeTimer)
      document.documentElement.classList.remove('ayar-splash-done')
    }
  }, [])

  return {
    isVisible,
    brandName: t('home.brand'),
    tagline: t('auth.tagline'),
    markLabel: SPLASH_MARK_LABEL,
  }
}

export { useSplashScreen }
