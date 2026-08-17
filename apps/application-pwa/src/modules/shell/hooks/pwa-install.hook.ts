import { useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { useI18n } from './i18n.hook'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const usePwaInstall = () => {
  const { t } = useI18n()
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(false)

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered: (registration) => {
      if (registration) {
        setInterval(() => registration.update(), 60 * 60 * 1000)
      }
    },
  })

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault()
      setInstallEvent(event as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleReload = () => {
    updateServiceWorker(true)
  }

  const handleInstall = async () => {
    if (!installEvent) {
      return
    }

    await installEvent.prompt()
    const { outcome } = await installEvent.userChoice

    if (outcome === 'accepted') {
      setInstallEvent(null)
    }
  }

  const handleDismiss = () => {
    setDismissed(true)
  }

  const showUpdate = needRefresh
  const showInstall = Boolean(installEvent) && !dismissed && !needRefresh

  return {
    t,
    showUpdate,
    showInstall,
    handleReload,
    handleInstall,
    handleDismiss,
  }
}

export { usePwaInstall }
