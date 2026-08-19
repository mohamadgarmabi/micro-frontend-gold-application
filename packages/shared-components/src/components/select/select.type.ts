import type { ChangeEvent, ReactNode } from 'react'

type SelectOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

type SelectRowAction = {
  id: string
  label: string
  onAction: (option: SelectOption) => void
}

type SelectRowActionView = {
  id: string
  label: string
  onClick: () => void
  className: string
}

type SelectRow = {
  value: string
  label: string
  description: ReactNode
  disabled: boolean
  leading: ReactNode
  onSelect: () => void
  rowClassName: string
  buttonClassName: string
  actions: SelectRowActionView[]
}

type SelectProps = {
  options: SelectOption[]
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  multiple?: boolean
  searchable?: boolean
  disabled?: boolean
  placeholder?: string
  searchPlaceholder?: string
  emptyLabel?: string
  doneLabel?: string
  title?: string
  className?: string
  rowActions?: SelectRowAction[]
}

type SelectPanelProps = {
  title?: string
  searchable: boolean
  search: string
  searchPlaceholder: string
  searchIcon: ReactNode
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  rows: SelectRow[]
  emptyLabel: string
  showDone: boolean
  doneLabel: string
  onDone: () => void
}

export type {
  SelectOption,
  SelectPanelProps,
  SelectProps,
  SelectRow,
  SelectRowAction,
  SelectRowActionView,
}
