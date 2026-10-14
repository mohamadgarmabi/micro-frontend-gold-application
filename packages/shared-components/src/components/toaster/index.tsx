import { AnimatePresence, motion } from "motion/react"
import GlassToast from "../glass-toast"
import { toast, useToaster, useToasterItem } from "./toaster.hook"
import type {
  ToastApi,
  ToasterItemProps,
  ToasterPosition,
  ToasterProps,
  ToastId,
  ToastOptions,
} from "./toaster.type"

const ToasterItem = ({ toast: record, enterOffset }: ToasterItemProps) => {
  const { className, role, handleClose, handleDragEnd } = useToasterItem(record)

  return (
    <motion.li
      layout
      role={role}
      className={className}
      initial={{ y: enterOffset, scale: 0.96 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
      drag="x"
      dragSnapToOrigin
      onDragEnd={handleDragEnd}
    >
      <GlassToast
        id={record.id}
        type={record.type}
        title={record.title}
        description={record.description}
        onClose={handleClose}
      />
    </motion.li>
  )
}

const Toaster = (props: ToasterProps) => {
  const { toasts, dir, label, className, enterOffset } = useToaster(props)

  return (
    <ol dir={dir} aria-label={label} aria-live="polite" className={className}>
      <AnimatePresence initial={false}>
        {toasts.map((record) => (
          <ToasterItem key={record.id} toast={record} enterOffset={enterOffset} />
        ))}
      </AnimatePresence>
    </ol>
  )
}

export default Toaster
export { toast }
export type { ToastApi, ToasterPosition, ToasterProps, ToastId, ToastOptions }
