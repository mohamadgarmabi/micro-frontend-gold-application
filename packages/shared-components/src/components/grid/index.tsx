import { createElement, type ElementType } from 'react'
import type { GridProps } from './grid.type'
import { useGrid } from './grid.hook'

const Grid = <E extends ElementType = 'div'>(props: GridProps<E>) => {
  const { Component, className, rest } = useGrid(props)

  return createElement(Component, { className, ...rest })
}

export default Grid
export type { GridAlign, GridColumns, GridGap, GridJustify, GridProps, GridRows } from './grid.type'
