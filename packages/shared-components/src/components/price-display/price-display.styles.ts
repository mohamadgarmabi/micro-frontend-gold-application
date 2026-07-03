import type { PriceDisplaySize } from './price-display.type';

const priceSizeClassName: Record<PriceDisplaySize, string> = {
  sm: 'text-base',
  md: 'text-2xl',
  lg: 'text-4xl',
};

export { priceSizeClassName };
