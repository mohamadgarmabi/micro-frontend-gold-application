import { cva } from 'class-variance-authority'

const selectStyles = cva('', {
  variants: {
    slot: {
      trigger:
        'inline-flex h-11 w-full min-w-40 items-center justify-between gap-2 rounded-xl border border-border bg-surface-elevated px-3.5 text-sm text-foreground shadow-sm transition-[border-color,box-shadow,transform] duration-160 ease-out hover:border-gold-600/40 focus-visible:border-gold-600 focus-visible:ring-2 focus-visible:ring-gold-600/20 focus-visible:outline-none active:scale-[0.99] gold-disabled',
      triggerLabel: 'min-w-0 truncate text-start',
      triggerPlaceholder: 'min-w-0 truncate text-start text-foreground-subtle',
      desktopPopup:
        'absolute start-0 top-[calc(100%+0.5rem)] z-50 flex max-h-80 min-w-56 w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated p-2 shadow-popup outline-none',
      mobilePopup: 'max-h-[85dvh]',
      title: 'px-4 pb-3 text-base font-semibold text-foreground',
      searchWrap: 'px-3 pb-2',
      list: 'flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-2 pb-2',
      empty: 'px-3 py-8 text-center text-sm text-foreground-subtle',
      row: 'flex items-center gap-1 rounded-xl px-1 transition-colors hover:bg-gold-600/8',
      rowSelected: 'flex items-center gap-1 rounded-xl bg-gold-600/10 px-1 transition-colors',
      rowButton:
        'flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-3 text-start text-sm text-foreground gold-disabled',
      rowAction:
        'shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-gold-600 transition-colors hover:bg-gold-600/10',
      doneWrap: 'border-t border-border px-3 pt-3',
      done: 'w-full rounded-xl py-3 text-sm font-semibold',
    },
  },
})

export { selectStyles }
