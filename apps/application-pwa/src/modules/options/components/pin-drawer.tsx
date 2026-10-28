import Drawer from "@gold/shared-components/drawer"
import { Glass } from "glisse"
import OTPField from "@gold/shared-components/otp-field"
import Typography from "@gold/shared-components/typography"
import { ChevronRight } from "lucide-react"
import { PIN_LENGTH } from "#/config/security.constants"
import { usePinDrawer } from "#/modules/auth/hooks/pin.hook"

const PinDrawer = () => {
  const {
    isOpen,
    handleOpen,
    handleOpenChange,
    pin,
    handlePinChange,
    pinSlots,
    error,
    rowLabel,
    title,
    hint,
  } = usePinDrawer()

  return (
    <>
      <Glass className="rounded-xl">
        <button
          type="button"
          onClick={handleOpen}
          className="border-border/40 hover:border-gold-600/30 flex w-full items-center justify-between rounded-xl border bg-transparent p-4 transition-all"
        >
          <Typography as="span" size="sm">
            {rowLabel}
          </Typography>
          <ChevronRight size={14} className="gold-rtl-flip text-foreground-subtle" />
        </button>
      </Glass>

      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content className="px-5 pb-6">
            <Drawer.Handle />
            <Drawer.Title className="mt-2 text-lg">{title}</Drawer.Title>
            <Drawer.Description className="text-foreground-subtle mt-1 text-sm">
              {hint}
            </Drawer.Description>

            <OTPField
              length={PIN_LENGTH}
              value={pin}
              onValueChange={handlePinChange}
              className="mt-6 mb-3 flex justify-center gap-3"
            >
              {pinSlots.map((slot) => (
                <OTPField.Input key={slot} />
              ))}
            </OTPField>

            {error ? (
              <Typography size="sm" color="danger" align="center" className="mb-3">
                {error}
              </Typography>
            ) : null}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    </>
  )
}

export default PinDrawer
