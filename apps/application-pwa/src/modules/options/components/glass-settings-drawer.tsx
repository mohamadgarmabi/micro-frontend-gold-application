import Drawer from "@gold/shared-components/drawer"
import Typography from "@gold/shared-components/typography"
import { Button, Glass, Slider } from "glisse"
import { ChevronRight } from "lucide-react"
import { useGlassSettingsDrawer } from "../hooks/glass-settings-drawer.hook"

const GlassSettingsDrawer = () => {
  const {
    t,
    isOpen,
    handleOpen,
    handleOpenChange,
    controls,
    depthLabel,
    previewKey,
    handleReset,
    isResetDisabled,
  } = useGlassSettingsDrawer()

  return (
    <>
      <Glass className="rounded-xl">
        <button
          type="button"
          onClick={handleOpen}
          className="border-border/40 hover:border-gold-600/30 flex w-full items-center justify-between gap-3 rounded-xl border bg-transparent p-4 transition-all"
        >
          <div className="text-start">
            <Typography as="span" size="sm">
              {t("options.glass")}
            </Typography>
            <Typography as="p" size="xs" weight="regular" color="subtle">
              {t("options.glassHint")}
            </Typography>
          </div>
          <ChevronRight size={14} className="gold-rtl-flip text-foreground-subtle shrink-0" />
        </button>
      </Glass>

      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content className="max-h-[92dvh] px-0">
            <Drawer.Handle />
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-6">
              <Drawer.Title className="mt-2 text-lg">{t("options.glassTitle")}</Drawer.Title>
              <Drawer.Description className="text-foreground-subtle mt-1 text-sm">
                {t("options.glassDescription")}
              </Drawer.Description>

              <div className="border-border relative mt-5 shrink-0 overflow-hidden rounded-3xl border bg-[repeating-linear-gradient(135deg,color-mix(in_oklab,var(--accent)_30%,var(--surface))_0_14px,var(--surface-secondary)_14px_28px)]">
                <div className="flex min-h-36 items-center justify-center p-6">
                  <Glass key={previewKey} className="h-24 w-full max-w-60 rounded-[28px]">
                    <div className="flex h-full flex-col items-center justify-center">
                      <Typography size="xs" weight="regular" className="tracking-widest uppercase">
                        {t("options.glassPreview")}
                      </Typography>
                      <Typography size="lg" weight="semibold" className="font-mono tabular-nums">
                        {depthLabel}
                      </Typography>
                    </div>
                  </Glass>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {controls.map((control) => (
                  <div key={control.id}>
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <Typography size="sm" weight="medium">
                        {control.label}
                      </Typography>
                      <Typography size="xs" weight="medium" className="font-mono tabular-nums">
                        {control.valueLabel}
                      </Typography>
                    </div>
                    <Typography size="xs" weight="regular" color="subtle" className="mb-3">
                      {control.hint}
                    </Typography>
                    <Slider
                      aria-label={control.label}
                      min={control.min}
                      max={control.max}
                      step={control.step}
                      value={control.value}
                      onValueChange={control.onChange}
                    />
                  </div>
                ))}
              </div>

              <Button
                type="button"
                className="mt-6 w-full shrink-0"
                onClick={handleReset}
                disabled={isResetDisabled}
              >
                {t("options.glassReset")}
              </Button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    </>
  )
}

export default GlassSettingsDrawer
