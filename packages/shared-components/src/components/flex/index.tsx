import { createElement, type ElementType } from 'react'
import type { FlexProps } from './flex.type'
import { useFlex } from './flex.hook'

const Flex = <E extends ElementType = 'div'>(props: FlexProps<E>) => {
  const { Component, className, rest } = useFlex(props)

  return createElement(Component, { className, ...rest })
}

export default Flex
export type {
  FlexAlign,
  FlexDirection,
  FlexGap,
  FlexJustify,
  FlexProps,
  FlexWrap,
} from './flex.type'
