import type { ComponentProps, ReactNode } from 'react'
import type { TabsRootProps } from '@heroui/react/tabs'

type TabsProps = Omit<TabsRootProps, 'selectedKey' | 'onSelectionChange' | 'defaultSelectedKey'> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children?: ReactNode
}

type TabProps = Omit<ComponentProps<typeof import('@heroui/react/tabs').Tabs.Tab>, 'id'> & {
  value?: string
  id?: string
}

type TabPanelProps = Omit<ComponentProps<typeof import('@heroui/react/tabs').Tabs.Panel>, 'id'> & {
  value?: string
  id?: string
}

export type { TabPanelProps, TabProps, TabsProps }
