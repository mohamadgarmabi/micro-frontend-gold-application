import type { ElementType } from 'react'
import { cn } from '../../lib/cn'
import type { FlexProps } from './flex.type'
import { flexStyles } from './flex.styles'

const useFlex = <E extends ElementType = 'div'>(props: FlexProps<E>) => {
  const {
    as,
    direction = 'row',
    align,
    justify,
    wrap,
    gap,
    grow = false,
    inline = false,
    className,
    ...rest
  } = props

  return {
    Component: as ?? 'div',
    className: cn(
      flexStyles({
        inline,
        direction,
        align,
        justify,
        wrap,
        gap,
        grow,
      }),
      className,
    ),
    rest,
  }
}

export { useFlex }
