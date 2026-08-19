import type { PriceDisplayProps } from './price-display.type'
import { priceChangeStyles, priceDisplayStyles } from './price-display.styles'

const defaultFormatValue = (value: number) => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const usePriceDisplay = ({
  value,
  change,
  size = 'md',
  formatValue = defaultFormatValue,
}: PriceDisplayProps) => {
  const up = change >= 0

  return {
    formattedValue: formatValue(value),
    changeLabel: `${Math.abs(change).toFixed(2)}%`,
    up,
    valueClassName: priceDisplayStyles({ size }),
    changeClassName: priceChangeStyles({ up }),
  }
}

export { defaultFormatValue, usePriceDisplay }
