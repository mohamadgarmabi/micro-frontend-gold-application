import type { ComponentProps } from 'react'
import { Drawer as VaulDrawer } from 'vaul'
import type { ContentProps, DialogProps, HandleProps } from 'vaul'

type DrawerRootProps = DialogProps

type DrawerNestedRootProps = DialogProps

type DrawerContentProps = ContentProps

type DrawerHandleProps = HandleProps

type DrawerOverlayProps = ComponentProps<typeof VaulDrawer.Overlay>

type DrawerTriggerProps = ComponentProps<typeof VaulDrawer.Trigger>

type DrawerCloseProps = ComponentProps<typeof VaulDrawer.Close>

type DrawerTitleProps = ComponentProps<typeof VaulDrawer.Title>

type DrawerDescriptionProps = ComponentProps<typeof VaulDrawer.Description>

type DrawerPortalProps = ComponentProps<typeof VaulDrawer.Portal>

type DrawerClassNameProps = {
  className?: string
}

export type {
  DrawerClassNameProps,
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
}
