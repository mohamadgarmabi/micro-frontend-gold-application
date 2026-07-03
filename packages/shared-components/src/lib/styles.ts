/** Gold design tokens as Tailwind class bundles for Base UI parts */

export const styles = {
  button: {
    base: 'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors gold-focus gold-disabled select-none',
    primary:
      'bg-gold-600 text-foreground-on-brand hover:bg-gold-700 active:bg-gold-800 data-popup-open:bg-gold-700',
    secondary:
      'border border-gold-600/30 bg-brand-surface text-gold-700 hover:bg-gold-100 active:bg-gold-200 data-popup-open:bg-gold-100',
    ghost:
      'bg-transparent text-foreground-muted hover:bg-gold-100 active:bg-gold-200 data-popup-open:bg-gold-100',
    destructive:
      'bg-danger text-white hover:bg-red-700 active:bg-red-800',
    icon: 'size-9 rounded-lg p-0',
  },

  input:
    'w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-foreground-subtle hover:border-border-strong focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 gold-disabled',

  inputWrapper: 'relative flex w-full items-center',

  inputWithLeftIcon: 'pl-9',

  inputWithRightIcon: 'pr-9',

  inputError:
    'border-danger hover:border-danger focus:border-danger focus:ring-danger/20',

  inputIconSlot:
    'pointer-events-none absolute inset-y-0 flex items-center text-foreground-subtle',

  inputIconLeft: 'left-3',

  inputIconRight: 'right-3',

  label: 'text-sm font-medium text-foreground',

  description: 'text-sm text-foreground-muted',

  error: 'text-sm text-danger',

  title: 'text-lg font-semibold text-foreground',

  subtitle: 'text-base font-medium text-foreground',

  backdrop:
    'fixed inset-0 z-50 bg-gold-900/40 backdrop-blur-[1px] data-ending-style:opacity-0 data-starting-style:opacity-0',

  popup:
    'z-50 rounded-xl border border-border bg-surface-elevated p-4 text-foreground shadow-popup outline-none data-ending-style:scale-[0.98] data-starting-style:scale-[0.98]',

  positioner: 'outline-none',

  menuPopup:
    'z-50 min-w-40 overflow-hidden rounded-xl border border-border bg-surface-elevated py-1 text-foreground shadow-popup outline-none data-ending-style:scale-95 data-starting-style:scale-95',

  menuItem:
    'flex cursor-default items-center gap-2 px-3 py-2 text-sm outline-none select-none data-highlighted:bg-gold-100 data-highlighted:text-gold-800 data-disabled:opacity-50',

  separator: 'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',

  checkboxRoot:
    'flex size-4 shrink-0 items-center justify-center rounded border border-border bg-white text-white transition-colors data-checked:border-gold-600 data-checked:bg-gold-600 gold-focus gold-disabled',

  checkboxIndicator: 'size-3',

  switchRoot:
    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-gold-100 transition-colors data-checked:bg-gold-600 gold-focus gold-disabled',

  switchThumb:
    'pointer-events-none block size-5 translate-x-0.5 rounded-full bg-white shadow-sm transition-transform data-checked:translate-x-[1.375rem]',

  radioRoot:
    'flex size-4 shrink-0 items-center justify-center rounded-full border border-border bg-white transition-colors data-checked:border-gold-600 gold-focus gold-disabled',

  radioIndicator: 'size-2 rounded-full bg-gold-600 data-unchecked:hidden',

  sliderRoot: 'relative flex w-full touch-none items-center select-none',

  sliderTrack: 'relative h-2 w-full grow overflow-hidden rounded-full bg-gold-100',

  sliderIndicator: 'absolute h-full bg-gold-600',

  sliderThumb:
    'block size-4 rounded-full border-2 border-gold-600 bg-surface shadow-sm gold-focus',

  progressRoot: 'relative h-2 w-full overflow-hidden rounded-full bg-gold-100',

  progressIndicator: 'h-full bg-gold-600 transition-all',

  meterTrack: 'relative h-2 w-full overflow-hidden rounded-full bg-gold-100',

  meterIndicator: 'h-full bg-gold-200',

  avatarRoot:
    'inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gold-100 text-sm font-medium text-gold-800',

  avatarImage: 'size-full object-cover',

  avatarFallback: 'flex size-full items-center justify-center',

  tabsList:
    'inline-flex h-10 items-center justify-center rounded-lg bg-gold-100 p-1 text-foreground-muted',

  tabsTrigger:
    'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors gold-focus data-active:bg-surface data-active:text-gold-700 data-active:shadow-sm',

  tabsPanel: 'mt-3 outline-none',

  accordionTrigger:
    'flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-gold-100 gold-focus',

  accordionPanel: 'px-4 pb-4 text-sm text-foreground-muted',

  toastViewport:
    'fixed top-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2 outline-none',

  toastRoot:
    'rounded-xl border border-border bg-surface-elevated p-4 shadow-popup data-ending-style:opacity-0 data-starting-style:opacity-0',

  tooltipPopup:
    'z-50 rounded-md bg-gold-800 px-2 py-1 text-xs text-foreground-on-brand shadow-md data-ending-style:opacity-0 data-starting-style:opacity-0',

  scrollViewport: 'size-full rounded-[inherit]',

  scrollScrollbar:
    'flex touch-none p-px transition-colors select-none data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-2.5',

  scrollThumb: 'relative flex-1 rounded-full bg-gold-300',

  fieldsetLegend: 'text-sm font-semibold text-foreground',

  toolbarRoot:
    'flex items-center gap-1 rounded-lg border border-border bg-surface p-1',

  toggle:
    'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-foreground-muted transition-colors hover:bg-gold-100 data-pressed:bg-gold-200 data-pressed:text-gold-800 gold-focus gold-disabled',

  selectTrigger:
    'inline-flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-foreground hover:border-border-strong gold-focus gold-disabled',

  selectPopup: 'z-50 max-h-72 overflow-auto rounded-xl border border-border bg-surface py-1 shadow-popup',

  selectItem:
    'flex cursor-default items-center px-3 py-2 text-sm outline-none select-none data-highlighted:bg-gold-100 data-highlighted:text-gold-800',

  otpInput:
    'size-10 rounded-lg border border-border bg-white text-center text-lg font-medium text-foreground gold-focus',

  drawerPopup:
    'fixed z-50 flex flex-col bg-surface shadow-popup outline-none data-ending-style:translate-y-full data-starting-style:translate-y-full',

  navigationList: 'flex items-center gap-1',

  navigationTrigger:
    'inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium text-foreground hover:bg-gold-50 gold-focus data-popup-open:bg-gold-50',

  previewCardPopup:
    'z-50 w-72 rounded-xl border border-border bg-surface p-4 shadow-popup data-ending-style:opacity-0 data-starting-style:opacity-0',

  chip: 'inline-flex items-center gap-1 rounded-full bg-gold-200 px-2 py-0.5 text-xs font-medium text-gold-800',
} as const;

/** Maps Base UI part names to style keys */
export const partStyles: Record<string, string> = {
  Root: '',
  Provider: '',
  Portal: '',
  Viewport: styles.toastViewport,
  Positioner: styles.positioner,
  Trigger: styles.button.secondary,
  Popup: styles.popup,
  Backdrop: styles.backdrop,
  Title: styles.title,
  Description: styles.description,
  Close: styles.button.ghost,
  Label: styles.label,
  Error: styles.error,
  Control: styles.input,
  Legend: styles.fieldsetLegend,
  Item: styles.menuItem,
  LinkItem: styles.menuItem,
  CheckboxItem: styles.menuItem,
  RadioItem: styles.menuItem,
  GroupLabel: 'px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-foreground-subtle',
  Separator: styles.separator,
  List: styles.navigationList,
  Panel: styles.accordionPanel,
  Header: '',
  Content: styles.tabsPanel,
  Tab: styles.tabsTrigger,
  TabPanel: styles.tabsPanel,
  TabsList: styles.tabsList,
  TabsTab: styles.tabsTrigger,
  TabsPanel: styles.tabsPanel,
  Indicator: styles.checkboxIndicator,
  Track: styles.sliderTrack,
  Thumb: styles.sliderThumb,
  Value: styles.description,
  Image: styles.avatarImage,
  Fallback: styles.avatarFallback,
  Input: styles.input,
  Icon: 'text-foreground-muted',
  Arrow: 'fill-white text-border',
  Group: '',
  Empty: 'px-3 py-2 text-sm text-foreground-muted',
  Clear: styles.button.ghost,
  Status: styles.description,
  Chip: styles.chip,
  Chips: 'flex flex-wrap gap-1',
  ChipRemove: styles.button.icon,
  Increment: styles.button.icon,
  Decrement: styles.button.icon,
  ScrubArea: 'cursor-ew-resize',
  Link: 'text-sm font-medium text-gold-700 hover:underline',
  Action: styles.button.primary,
  SwipeArea: '',
  Indent: '',
  IndentBackground: '',
  VirtualKeyboardProvider: '',
  SubmenuTrigger: styles.menuItem,
  SubmenuRoot: '',
  RadioGroup: 'flex flex-col gap-2',
  CheckboxItemIndicator: styles.checkboxIndicator,
  RadioItemIndicator: styles.radioIndicator,
  ItemIndicator: styles.checkboxIndicator,
  ItemText: '',
  ScrollUpArrow: styles.button.ghost,
  ScrollDownArrow: styles.button.ghost,
  Scrollbar: styles.scrollScrollbar,
  ScrollThumb: styles.scrollThumb,
  Collection: '',
  Row: '',
  InputGroup: 'flex items-center gap-2',
  Validity: styles.error,
};

export const singleComponentStyles: Record<string, string> = {
  Button: `${styles.button.base} ${styles.button.primary}`,
  Input: styles.input,
  Separator: styles.separator,
  Form: 'flex flex-col gap-4',
  CheckboxGroup: 'flex flex-col gap-3',
  RadioGroup: 'flex flex-col gap-3',
};
