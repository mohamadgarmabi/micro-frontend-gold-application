type PriceDisplaySize = 'sm' | 'md' | 'lg';

type PriceDisplayProps = {
  value: number;
  change: number;
  size?: PriceDisplaySize;
  formatValue?: (value: number) => string;
  className?: string;
};

export type { PriceDisplayProps, PriceDisplaySize };
