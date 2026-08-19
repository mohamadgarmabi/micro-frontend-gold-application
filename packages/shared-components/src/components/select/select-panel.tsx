import Button from '../button'
import Input from '../input'
import type { SelectPanelProps } from './select.type'
import { selectStyles } from './select.styles'

const SelectPanel = ({
  title,
  searchable,
  search,
  searchPlaceholder,
  searchIcon,
  onSearchChange,
  rows,
  emptyLabel,
  showDone,
  doneLabel,
  onDone,
}: SelectPanelProps) => {
  return (
    <>
      {title ? <p className={selectStyles({ slot: 'title' })}>{title}</p> : null}
      {searchable ? (
        <div className={selectStyles({ slot: 'searchWrap' })}>
          <Input
            value={search}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            leftIcon={searchIcon}
          />
        </div>
      ) : null}
      <div className={selectStyles({ slot: 'list' })} role="listbox">
        {rows.length === 0 ? <p className={selectStyles({ slot: 'empty' })}>{emptyLabel}</p> : null}
        {rows.map((row) => (
          <div key={row.value} className={row.rowClassName}>
            <button
              type="button"
              role="option"
              className={row.buttonClassName}
              onClick={row.onSelect}
              disabled={row.disabled}
            >
              {row.leading}
              <span className="min-w-0">
                <span className="block truncate">{row.label}</span>
                {row.description}
              </span>
            </button>
            {row.actions.map((action) => (
              <button
                key={action.id}
                type="button"
                className={action.className}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        ))}
      </div>
      {showDone ? (
        <div className={selectStyles({ slot: 'doneWrap' })}>
          <Button type="button" className={selectStyles({ slot: 'done' })} onClick={onDone}>
            {doneLabel}
          </Button>
        </div>
      ) : null}
    </>
  )
}

export default SelectPanel
export type { SelectPanelProps }
