import { createElement, useState } from 'react'
import { cn } from '../../lib/cn'
import {
  selectCheckIcon,
  selectChevronIcon,
  selectEmptyIcon,
  selectSearchIcon,
} from './select.icons'
import { useSelectShell } from './select.shell.hook'
import type { SelectProps, SelectRow } from './select.type'
import { selectStyles } from './select.styles'

const toValues = (value: string | string[] | undefined) => {
  if (value === undefined) {
    return []
  }

  return Array.isArray(value) ? value : [value]
}

const useSelect = (props: SelectProps) => {
  const {
    options,
    value,
    defaultValue,
    onValueChange,
    multiple = false,
    searchable = true,
    disabled = false,
    placeholder = 'Select',
    searchPlaceholder = 'Search',
    emptyLabel = 'No results',
    doneLabel = 'Done',
    title,
    className,
    rowActions = [],
  } = props

  const shell = useSelectShell(disabled)
  const [uncontrolled, setUncontrolled] = useState(() => toValues(defaultValue))
  const selectedValues = value !== undefined ? toValues(value) : uncontrolled

  const commit = (next: string[]) => {
    if (value === undefined) {
      setUncontrolled(next)
    }

    onValueChange?.(multiple ? next : (next[0] ?? ''))
  }

  const selectedOptions = options.filter((option) => selectedValues.includes(option.value))
  const query = shell.search.trim().toLowerCase()
  const visibleOptions = query
    ? options.filter((option) => option.label.toLowerCase().includes(query))
    : options

  const rows: SelectRow[] = visibleOptions.map((option) => {
    const isSelected = selectedValues.includes(option.value)

    return {
      value: option.value,
      label: option.label,
      description: option.description
        ? createElement('span', { className: 'text-xs text-foreground-subtle' }, option.description)
        : null,
      disabled: Boolean(option.disabled),
      leading: isSelected ? selectCheckIcon : selectEmptyIcon,
      onSelect: () => {
        if (option.disabled) {
          return
        }

        if (multiple) {
          commit(
            isSelected
              ? selectedValues.filter((item) => item !== option.value)
              : [...selectedValues, option.value],
          )
          return
        }

        commit([option.value])
        shell.close()
      },
      rowClassName: selectStyles({ slot: isSelected ? 'rowSelected' : 'row' }),
      buttonClassName: selectStyles({ slot: 'rowButton' }),
      actions: rowActions.map((action) => ({
        id: action.id,
        label: action.label,
        className: selectStyles({ slot: 'rowAction' }),
        onClick: () => action.onAction(option),
      })),
    }
  })

  const hasValue = selectedOptions.length > 0

  return {
    ...shell,
    disabled,
    searchable,
    searchPlaceholder,
    emptyLabel,
    doneLabel,
    title,
    showDone: multiple,
    triggerLabel: hasValue ? selectedOptions.map((option) => option.label).join(', ') : placeholder,
    triggerClassName: cn(selectStyles({ slot: 'trigger' }), className),
    triggerLabelClassName: selectStyles({ slot: hasValue ? 'triggerLabel' : 'triggerPlaceholder' }),
    chevron: selectChevronIcon,
    searchIcon: selectSearchIcon,
    rows,
  }
}

export { useSelect }
