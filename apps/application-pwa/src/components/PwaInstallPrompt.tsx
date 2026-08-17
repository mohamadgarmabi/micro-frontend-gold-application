import { usePwaInstall } from '#/modules/shell/hooks/pwa-install.hook'

const PwaInstallPrompt = () => {
  const { t, showUpdate, showInstall, handleReload, handleInstall, handleDismiss } = usePwaInstall()

  if (showUpdate) {
    return (
      <div className="pwa-banner" role="status">
        <p className="m-0 text-sm">{t('pwa.updateAvailable')}</p>
        <button type="button" className="pwa-banner__action" onClick={handleReload}>
          {t('pwa.reload')}
        </button>
      </div>
    )
  }

  if (showInstall) {
    return (
      <div className="pwa-banner" role="dialog" aria-label={t('pwa.installLabel')}>
        <p className="m-0 text-sm">{t('pwa.installHint')}</p>
        <div className="flex gap-2">
          <button type="button" className="pwa-banner__action" onClick={handleInstall}>
            {t('pwa.install')}
          </button>
          <button type="button" className="pwa-banner__dismiss" onClick={handleDismiss}>
            {t('pwa.notNow')}
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default PwaInstallPrompt
