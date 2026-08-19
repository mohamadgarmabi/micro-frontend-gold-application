import Drawer from '../drawer'
import type { SelectProps } from './select.type'
import { useSelect } from './select.hook'
import { selectStyles } from './select.styles'
import SelectPanel from './select-panel'

const Select = (props: SelectProps) => {
  const {
    open,
    isMobile,
    disabled,
    searchable,
    search,
    searchPlaceholder,
    emptyLabel,
    doneLabel,
    title,
    showDone,
    triggerLabel,
    triggerClassName,
    triggerLabelClassName,
    chevron,
    searchIcon,
    rows,
    rootRef,
    handleOpenChange,
    handleToggle,
    handleSearchChange,
    handleDone,
  } = useSelect(props)

  const panel = (
    <SelectPanel
      title={title}
      searchable={searchable}
      search={search}
      searchPlaceholder={searchPlaceholder}
      searchIcon={searchIcon}
      onSearchChange={handleSearchChange}
      rows={rows}
      emptyLabel={emptyLabel}
      showDone={showDone}
      doneLabel={doneLabel}
      onDone={handleDone}
    />
  )

  return (
    <div ref={rootRef} className="relative w-full min-w-40">
      <button
        type="button"
        className={triggerClassName}
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={triggerLabelClassName}>{triggerLabel}</span>
        {chevron}
      </button>
      {isMobile ? (
        <Drawer open={open} onOpenChange={handleOpenChange}>
          <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content className={selectStyles({ slot: 'mobilePopup' })}>
              <Drawer.Handle />
              {panel}
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer>
      ) : null}
      {open && !isMobile ? (
        <div className={selectStyles({ slot: 'desktopPopup' })}>{panel}</div>
      ) : null}
    </div>
  )
}

export default Select
export type { SelectOption, SelectProps, SelectRowAction } from './select.type'
