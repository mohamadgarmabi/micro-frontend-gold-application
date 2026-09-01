import { createElement } from 'react'
import { Tabs as HeroTabs } from '@heroui/react/tabs'
import type { TabPanelProps, TabProps, TabsProps } from './tabs.type'

const TabsRoot = (props: TabsProps) => {
  const { value, defaultValue, onValueChange, children, ...rest } = props

  return createElement(HeroTabs, {
    selectedKey: value,
    defaultSelectedKey: defaultValue,
    onSelectionChange: (key) => {
      if (key == null) return
      onValueChange?.(String(key))
    },
    ...rest,
    children,
  })
}

const Tab = ({ value, id, ...props }: TabProps) => {
  return createElement(HeroTabs.Tab, {
    id: id ?? value,
    ...props,
  })
}

const Panel = ({ value, id, ...props }: TabPanelProps) => {
  return createElement(HeroTabs.Panel, {
    id: id ?? value,
    ...props,
  })
}

const Tabs = Object.assign(TabsRoot, {
  List: HeroTabs.List,
  Tab,
  Panel,
  Indicator: HeroTabs.Indicator,
  ListContainer: HeroTabs.ListContainer,
  Separator: HeroTabs.Separator,
})

export default Tabs
export type { TabPanelProps, TabProps, TabsProps } from './tabs.type'
