import type { PriceDisplayProps } from './price-display.type';
import { priceSizeClassName } from './price-display.styles';

function defaultFormatValue(value: number) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function usePriceDisplay({
  value,
  change,
  size = 'md',
  formatValue = defaultFormatValue,
}: PriceDisplayProps) {
  const up = change >= 0;

  return {
    formattedValue: formatValue(value),
    changeLabel: `${Math.abs(change).toFixed(2)}%`,
    up,
    valueClassName: priceSizeClassName[size],
  };
}

export { usePriceDisplay, defaultFormatValue };
