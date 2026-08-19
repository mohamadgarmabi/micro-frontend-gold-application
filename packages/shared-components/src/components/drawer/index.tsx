import { createElement } from 'react'
import { Drawer as VaulDrawer } from 'vaul'
import type {
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
  useDrawerClose,
  useDrawerContent,
  useDrawerDescription,
  useDrawerHandle,
  useDrawerNestedRoot,
  useDrawerOverlay,
  useDrawerRoot,
  useDrawerTitle,
  useDrawerTrigger,
} from './drawer.hook'

const DrawerRoot = (props: DrawerRootProps) => {
  const rootProps = useDrawerRoot(props)
  return createElement(VaulDrawer.Root, rootProps)
}

const DrawerNestedRoot = (props: DrawerNestedRootProps) => {
  const nestedRootProps = useDrawerNestedRoot(props)
  return createElement(VaulDrawer.NestedRoot, nestedRootProps)
}

const DrawerTrigger = (props: DrawerTriggerProps) => {
  const triggerProps = useDrawerTrigger(props)
  return createElement(VaulDrawer.Trigger, triggerProps)
}

const DrawerOverlay = (props: DrawerOverlayProps) => {
  const overlayProps = useDrawerOverlay(props)
  return createElement(VaulDrawer.Overlay, overlayProps)
}

const DrawerContent = (props: DrawerContentProps) => {
  const contentProps = useDrawerContent(props)
  return createElement(VaulDrawer.Content, contentProps)
}

const DrawerHandle = (props: DrawerHandleProps) => {
  const handleProps = useDrawerHandle(props)
  return createElement(VaulDrawer.Handle, handleProps)
}

const DrawerTitle = (props: DrawerTitleProps) => {
  const titleProps = useDrawerTitle(props)
  return createElement(VaulDrawer.Title, titleProps)
}

const DrawerDescription = (props: DrawerDescriptionProps) => {
  const descriptionProps = useDrawerDescription(props)
  return createElement(VaulDrawer.Description, descriptionProps)
}

const DrawerClose = (props: DrawerCloseProps) => {
  const closeProps = useDrawerClose(props)
  return createElement(VaulDrawer.Close, closeProps)
}

const Drawer = Object.assign(DrawerRoot, {
  Root: DrawerRoot,
  NestedRoot: DrawerNestedRoot,
  Trigger: DrawerTrigger,
  Portal: VaulDrawer.Portal,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Handle: DrawerHandle,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Close: DrawerClose,
})

export default Drawer
export type {
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerHandleProps,
  DrawerNestedRootProps,
  DrawerOverlayProps,
  DrawerPortalProps,
  DrawerRootProps,
  DrawerTitleProps,
  DrawerTriggerProps,
} from './drawer.type'
