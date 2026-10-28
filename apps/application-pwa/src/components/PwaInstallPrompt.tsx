import { Glass } from "glisse"
import Typography from "@gold/shared-components/typography"
import { usePwaInstall } from "#/modules/shell/hooks/pwa-install.hook"

const PwaInstallPrompt = () => {
  const { t, showUpdate, showInstall, handleReload, handleInstall, handleDismiss } = usePwaInstall()

  if (showUpdate) {
    return (
      <div className="pwa-banner" role="status">
        <Glass className="rounded-2xl">
          <div className="pwa-banner__body">
            <Typography size="sm" className="m-0">
              {t("pwa.updateAvailable")}
            </Typography>
            <button type="button" className="pwa-banner__action" onClick={handleReload}>
              {t("pwa.reload")}
            </button>
          </div>
        </Glass>
      </div>
    )
  }

  if (showInstall) {
    return (
      <div className="pwa-banner" role="dialog" aria-label={t("pwa.installLabel")}>
        <Glass className="rounded-2xl">
          <div className="pwa-banner__body">
            <Typography size="sm" className="m-0">
              {t("pwa.installHint")}
            </Typography>
            <div className="flex gap-2">
              <button type="button" className="pwa-banner__action" onClick={handleInstall}>
                {t("pwa.install")}
              </button>
              <button type="button" className="pwa-banner__dismiss" onClick={handleDismiss}>
                {t("pwa.notNow")}
              </button>
            </div>
          </div>
        </Glass>
      </div>
    )
  }

  return null
}

export default PwaInstallPrompt
