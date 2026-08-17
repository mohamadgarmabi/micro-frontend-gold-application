import { fmt } from '#/modules/market/utils/format'
import type { PriceTagProps } from '../types'

const usePriceTag = ({ value, change, size = 'md' }: PriceTagProps) => {
  const formatValue = (amount: number) => fmt(amount)

  return { value, change, size, formatValue }
}

export { usePriceTag }
