import Typography from "@gold/shared-components/typography"
import type { OrderSummaryProps } from "../types"

const OrderSummary = ({ rows, totalLabel, totalValue }: OrderSummaryProps) => {
  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between">
          <Typography as="span" size="sm" color="subtle">
            {row.label}
          </Typography>
          <Typography as="span" size="sm" className="font-mono">
            {row.value}
          </Typography>
        </div>
      ))}
      <div className="border-border flex items-center justify-between border-t pt-2">
        <Typography as="span" size="sm" weight="semibold">
          {totalLabel}
        </Typography>
        <Typography as="span" size="md" weight="semibold" color="brand" className="font-mono">
          {totalValue}
        </Typography>
      </div>
    </div>
  )
}

export default OrderSummary
