import PriceDisplay from '@gold/shared-components/price-display'
import { fmt } from '#/modules/market/utils/format'
import type { PriceTagProps } from '../types'

function PriceTag({ value, change, size = 'md' }: PriceTagProps) {
  return (
    <PriceDisplay
      value={value}
      change={change}
      size={size}
      formatValue={(amount) => fmt(amount)}
    />
  )
}

export default PriceTag
