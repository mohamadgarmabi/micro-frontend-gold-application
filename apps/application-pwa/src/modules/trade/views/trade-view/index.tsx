import Button from '@gold/shared-components/button'
import Input from '@gold/shared-components/input'
import Tabs from '@gold/shared-components/tabs'
import { toast } from '@gold/shared-components/sonner'
import { Minus, Plus } from 'lucide-react'
import { SPOT_PRICE } from '#/modules/market/utils/data'
import { fmt } from '#/modules/market/utils/format'
import Card from '#/modules/shell/components/card'
import GoldBadge from '#/modules/shell/components/gold-badge'
import { useTrade } from '../../hooks/trade.hook'

function TradeView() {
  const { side, setSide, amount, setAmount, decrementAmount, incrementAmount, setQuickAmount } =
    useTrade()
  const spotPrice = SPOT_PRICE
  const spread = 2.5
  const execPrice = side === 'buy' ? spotPrice + spread / 2 : spotPrice - spread / 2
  const total = parseFloat(amount || '0') * execPrice
  const fee = total * 0.0015

  return (
    <div className="min-h-screen pb-24">
        <div className="px-5 pt-12 pb-6">
          <h2 className="aurum-serif mb-1 text-xl font-semibold text-foreground">Trade Gold</h2>
          <p className="text-xs text-foreground-subtle">XAU/USD · Spot</p>
        </div>

        <div className="space-y-4 px-5">
          <Tabs value={side} onValueChange={(value) => setSide(value as 'buy' | 'sell')}>
            <Tabs.List className="w-full">
              <Tabs.Tab value="buy" className="flex-1 capitalize text-success data-active:bg-success-muted data-active:text-success">
                Buy
              </Tabs.Tab>
              <Tabs.Tab value="sell" className="flex-1 capitalize text-danger data-active:bg-danger-muted data-active:text-danger">
                Sell
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <Card>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs tracking-widest text-foreground-subtle uppercase">
                Execution Price
              </span>
              <GoldBadge>Live</GoldBadge>
            </div>
            <p className="font-mono text-2xl font-medium text-foreground">${fmt(execPrice)}</p>
            <p className="mt-1 text-xs text-foreground-subtle">
              Spread: ${fmt(spread)} · Spot: ${fmt(spotPrice)}
            </p>
          </Card>

          <div>
            <label className="mb-2 block text-xs tracking-widest text-foreground-subtle uppercase">
              Amount (troy oz)
            </label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={decrementAmount}
                className="size-11 rounded-xl border border-border bg-surface-muted p-0 text-foreground hover:border-gold-600/40 hover:bg-surface-elevated"
              >
                <Minus size={16} />
              </Button>
              <Input
                type="number"
                value={amount}
                onValueChange={setAmount}
                className="flex-1 text-center font-mono text-xl font-medium"
              />
              <Button
                type="button"
                onClick={incrementAmount}
                className="size-11 rounded-xl border border-border bg-surface-muted p-0 text-foreground hover:border-gold-600/40 hover:bg-surface-elevated"
              >
                <Plus size={16} />
              </Button>
            </div>
            <div className="mt-2 flex gap-2">
              {[0.5, 1, 2, 5].map((q) => (
                <Button
                  key={q}
                  type="button"
                  onClick={() => setQuickAmount(q)}
                  className="flex-1 rounded-lg border border-border bg-transparent py-1.5 text-xs text-foreground-subtle hover:border-gold-600/30 hover:bg-surface-muted hover:text-foreground"
                >
                  {q} oz
                </Button>
              ))}
            </div>
          </div>

          <Card className="space-y-3">
            <p className="text-xs tracking-widest text-foreground-subtle uppercase">Order Summary</p>
            {[
              { label: 'Quantity', val: `${parseFloat(amount).toFixed(2)} oz` },
              { label: 'Price', val: `$${fmt(execPrice)}/oz` },
              { label: 'Subtotal', val: `$${fmt(total)}` },
              { label: 'Fee (0.15%)', val: `$${fmt(fee)}` },
            ].map(({ label, val }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm text-foreground-subtle">{label}</span>
                <span className="font-mono text-sm text-foreground">{val}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-border pt-2">
              <span className="text-sm font-semibold text-foreground">Total</span>
              <span className="font-mono text-base font-semibold text-gold-600">
                ${fmt(total + fee)}
              </span>
            </div>
          </Card>

          <Button
            type="button"
            onClick={() =>
              toast.success(
                side === 'buy'
                  ? `سفارش خرید ${amount} اونس ثبت شد`
                  : `سفارش فروش ${amount} اونس ثبت شد`,
              )
            }
            className={`w-full rounded-xl py-4 text-sm font-semibold ${
              side === 'buy'
                ? 'bg-success text-white shadow-lg shadow-success/25 hover:bg-success/90'
                : 'bg-danger text-white shadow-lg shadow-danger/25 hover:bg-danger/90'
            }`}
          >
            {side === 'buy' ? `Buy ${amount} oz Gold` : `Sell ${amount} oz Gold`}
          </Button>

          <p className="text-center text-[10px] text-foreground-subtle">
            Orders execute at market price · Subject to regulatory review
          </p>
        </div>
    </div>
  )
}

export default TradeView
