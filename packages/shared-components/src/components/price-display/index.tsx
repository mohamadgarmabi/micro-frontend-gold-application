import { cn } from '../../lib/cn';
import type { PriceDisplayProps, PriceDisplaySize } from './price-display.type';
import { usePriceDisplay } from './price-display.hook';

function ChangeIcon({ up }: { up: boolean }) {
  return (
    <svg
      aria-hidden
      className="size-3 shrink-0"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {up ? (
        <path
          d="M6 2.5L9.5 7H2.5L6 2.5Z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M6 9.5L2.5 5H9.5L6 9.5Z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

function PriceDisplay({
  value,
  change,
  size = 'md',
  formatValue,
  className,
}: PriceDisplayProps) {
  const { formattedValue, changeLabel, up, valueClassName } = usePriceDisplay({
    value,
    change,
    size,
    formatValue,
  });

  return (
    <div className={cn('flex items-end gap-2', className)}>
      <span className={cn('font-mono font-medium text-foreground', valueClassName)}>
        ${formattedValue}
      </span>
      <span
        className={cn(
          'mb-0.5 flex items-center gap-0.5 font-mono text-sm',
          up ? 'text-success' : 'text-danger',
        )}
      >
        <ChangeIcon up={up} />
        {changeLabel}
      </span>
    </div>
  );
}

export default PriceDisplay;
export type { PriceDisplayProps, PriceDisplaySize };
