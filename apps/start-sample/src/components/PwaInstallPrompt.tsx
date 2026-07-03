import { useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PwaInstallPrompt() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(false)

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
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

  if (needRefresh) {
    return (
      <div className="pwa-banner" role="status">
        <p className="m-0 text-sm">A new version is available.</p>
        <button
          type="button"
          className="pwa-banner__action"
          onClick={() => updateServiceWorker(true)}
        >
          Reload
        </button>
      </div>
    )
  }

  if (!installEvent || dismissed) {
    return null
  }

  return (
    <div className="pwa-banner" role="dialog" aria-label="Install app">
      <p className="m-0 text-sm">Install Gold Start for offline access.</p>
      <div className="flex gap-2">
        <button
          type="button"
          className="pwa-banner__action"
          onClick={async () => {
            await installEvent.prompt()
            const { outcome } = await installEvent.userChoice
            if (outcome === 'accepted') {
              setInstallEvent(null)
            }
          }}
        >
          Install
        </button>
        <button
          type="button"
          className="pwa-banner__dismiss"
          onClick={() => setDismissed(true)}
        >
          Not now
        </button>
      </div>
    </div>
  )
}
