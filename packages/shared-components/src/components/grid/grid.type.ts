import type { ElementType, ReactNode } from 'react'
import type { PolymorphicProps } from '../../lib/polymorphic.type'

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6

type GridRows = 1 | 2 | 3 | 4 | 5 | 6

type GridAlign = 'start' | 'center' | 'end' | 'stretch'

type GridJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8

type GridOwnProps = {
  columns?: GridColumns
  rows?: GridRows
  align?: GridAlign
  justify?: GridJustify
  gap?: GridGap
  columnGap?: GridGap
  rowGap?: GridGap
  inline?: boolean
  className?: string
  children?: ReactNode
}

type GridProps<E extends ElementType = 'div'> = PolymorphicProps<E, GridOwnProps>

export type { GridAlign, GridColumns, GridGap, GridJustify, GridOwnProps, GridProps, GridRows }
