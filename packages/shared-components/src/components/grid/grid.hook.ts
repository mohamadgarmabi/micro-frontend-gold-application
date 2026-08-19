import type { ElementType } from 'react'
import { cn } from '../../lib/cn'
import type { GridProps } from './grid.type'
import { gridStyles } from './grid.styles'

const useGrid = <E extends ElementType = 'div'>(props: GridProps<E>) => {
  const {
    as,
    columns,
    rows,
    align,
    justify,
    gap,
    columnGap,
    rowGap,
    inline = false,
    className,
    ...rest
  } = props

  return {
    Component: as ?? 'div',
    className: cn(
      gridStyles({
        inline,
        columns,
        rows,
        align,
        justify,
        gap,
        columnGap,
        rowGap,
      }),
      className,
    ),
    rest,
  }
}

export { useGrid }
