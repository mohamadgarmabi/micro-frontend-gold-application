import PriceDisplay from '@gold/shared-components/price-display'
import { usePriceTag } from '../hooks/price-tag.hook'
import type { PriceTagProps } from '../types'

const PriceTag = (props: PriceTagProps) => {
  const { value, change, size, formatValue } = usePriceTag(props)

  return <PriceDisplay value={value} change={change} size={size} formatValue={formatValue} />
}

export default PriceTag
