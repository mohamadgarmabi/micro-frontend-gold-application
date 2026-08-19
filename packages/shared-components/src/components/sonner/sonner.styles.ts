import { cva } from 'class-variance-authority'

const sonnerStyles = cva('', {
  variants: {
    slot: {
      toaster: 'gold-sonner',
      toast:
        'group !rounded-xl !border !border-border !bg-surface-elevated !text-foreground !shadow-popup !font-sans',
      title: '!text-sm !font-semibold !text-foreground',
      description: '!text-sm !text-foreground-muted',
      actionButton:
        '!rounded-lg !bg-button !px-3 !py-1.5 !text-xs !font-semibold !text-button-foreground',
      cancelButton:
        '!rounded-lg !border !border-border !bg-surface !px-3 !py-1.5 !text-xs !font-medium !text-foreground-muted',
      closeButton:
        '!border-border !bg-surface !text-foreground-subtle hover:!bg-surface-muted hover:!text-foreground',
      success: '!border-success/30 !bg-success-muted !text-success',
      error: '!border-danger/30 !bg-danger-muted !text-danger',
      warning: '!border-warning/30 !bg-warning-muted !text-warning',
      info: '!border-info/30 !bg-info-muted !text-info',
    },
  },
})

const sonnerClassNames = {
  toaster: sonnerStyles({ slot: 'toaster' }),
  toast: sonnerStyles({ slot: 'toast' }),
  title: sonnerStyles({ slot: 'title' }),
  description: sonnerStyles({ slot: 'description' }),
  actionButton: sonnerStyles({ slot: 'actionButton' }),
  cancelButton: sonnerStyles({ slot: 'cancelButton' }),
  closeButton: sonnerStyles({ slot: 'closeButton' }),
  success: sonnerStyles({ slot: 'success' }),
  error: sonnerStyles({ slot: 'error' }),
  warning: sonnerStyles({ slot: 'warning' }),
  info: sonnerStyles({ slot: 'info' }),
}

const sonnerToastOptions = {
  classNames: sonnerClassNames,
}

export { sonnerClassNames, sonnerStyles, sonnerToastOptions }
