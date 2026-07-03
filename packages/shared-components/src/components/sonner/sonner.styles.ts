const sonnerClassNames = {
  toaster: 'gold-sonner',
  toast:
    'group !rounded-xl !border !border-border !bg-surface-elevated !text-foreground !shadow-popup !font-sans',
  title: '!text-sm !font-semibold !text-foreground',
  description: '!text-sm !text-foreground-muted',
  actionButton:
    '!rounded-lg !bg-gold-600 !px-3 !py-1.5 !text-xs !font-semibold !text-foreground-on-brand',
  cancelButton:
    '!rounded-lg !border !border-border !bg-surface !px-3 !py-1.5 !text-xs !font-medium !text-foreground-muted',
  closeButton:
    '!border-border !bg-surface !text-foreground-subtle hover:!bg-surface-muted hover:!text-foreground',
  success: '!border-success/30 !bg-success-muted !text-success',
  error: '!border-danger/30 !bg-danger-muted !text-danger',
  warning: '!border-warning/30 !bg-warning-muted !text-warning',
  info: '!border-info/30 !bg-info-muted !text-info',
};

const sonnerToastOptions = {
  classNames: sonnerClassNames,
};

export { sonnerClassNames, sonnerToastOptions };
