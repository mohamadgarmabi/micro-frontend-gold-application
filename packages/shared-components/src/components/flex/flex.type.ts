import type { ElementType, ReactNode } from 'react'
import type { PolymorphicProps } from '../../lib/polymorphic.type'

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'

type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'

type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

type FlexGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8

type FlexOwnProps = {
  direction?: FlexDirection
  align?: FlexAlign
  justify?: FlexJustify
  wrap?: FlexWrap
  gap?: FlexGap
  grow?: boolean
  inline?: boolean
  className?: string
  children?: ReactNode
}

type FlexProps<E extends ElementType = 'div'> = PolymorphicProps<E, FlexOwnProps>

export type { FlexAlign, FlexDirection, FlexGap, FlexJustify, FlexOwnProps, FlexProps, FlexWrap }
