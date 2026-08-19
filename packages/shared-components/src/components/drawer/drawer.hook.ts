import { cn } from '../../lib/cn'
import type {
  DrawerClassNameProps,
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerHandleProps,
  DrawerNestedRootProps,
  DrawerOverlayProps,
  DrawerRootProps,
  DrawerTitleProps,
  DrawerTriggerProps,
} from './drawer.type'
import {
  drawerClose,
  drawerContent,
  drawerDescription,
  drawerHandle,
  drawerOverlay,
  drawerTitle,
  drawerTrigger,
} from './drawer.styles'

const withDrawerClassName = <T extends DrawerClassNameProps>(props: T, styles: () => string) => {
  const { className, ...rest } = props
  return { ...rest, className: cn(styles(), className) }
}

const useDrawerRoot = (props: DrawerRootProps) => {
  const { shouldScaleBackground = false, ...rest } = props
  return { shouldScaleBackground, ...rest }
}

const useDrawerNestedRoot = (props: DrawerNestedRootProps) => {
  return useDrawerRoot(props)
}

const useDrawerTrigger = (props: DrawerTriggerProps) => {
  return withDrawerClassName(props, drawerTrigger)
}

const useDrawerOverlay = (props: DrawerOverlayProps) => {
  return withDrawerClassName(props, drawerOverlay)
}

const useDrawerContent = (props: DrawerContentProps) => {
  return withDrawerClassName(props, drawerContent)
}

const useDrawerHandle = (props: DrawerHandleProps) => {
  return withDrawerClassName(props, drawerHandle)
}

const useDrawerTitle = (props: DrawerTitleProps) => {
  return withDrawerClassName(props, drawerTitle)
}

const useDrawerDescription = (props: DrawerDescriptionProps) => {
  return withDrawerClassName(props, drawerDescription)
}

const useDrawerClose = (props: DrawerCloseProps) => {
  return withDrawerClassName(props, drawerClose)
}

export {
  useDrawerClose,
  useDrawerContent,
  useDrawerDescription,
  useDrawerHandle,
  useDrawerNestedRoot,
  useDrawerOverlay,
  useDrawerRoot,
  useDrawerTitle,
  useDrawerTrigger,
}
