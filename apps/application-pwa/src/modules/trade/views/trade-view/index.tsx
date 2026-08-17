import Button from '@gold/shared-components/button'
import Input from '@gold/shared-components/input'
import Tabs from '@gold/shared-components/tabs'
import { Minus, Plus } from 'lucide-react'
import Card from '#/modules/shell/components/card'
import GoldBadge from '#/modules/shell/components/gold-badge'
import { useTrade } from '../../hooks/trade.hook'

const TradeView = () => {
  const {
    t,
    side,
    amount,
    setAmount,
    decrementAmount,
    incrementAmount,
    handleSideChange,
    handleSubmit,
    execPriceLabel,
    spreadSpotLabel,
    totalLabel,
    submitLabel,
    submitClassName,
    quickAmounts,
    orderRows,
  } = useTrade()

  return (
    <div className="min-h-screen pb-24">
      <div className="px-5 pt-12 pb-6">
        <h2 className="aurum-serif mb-1 text-xl font-semibold text-foreground">
          {t('trade.title')}
        </h2>
        <p className="text-xs text-foreground-subtle">{t('trade.subtitle')}</p>
      </div>

      <div className="space-y-4 px-5">
        <Tabs value={side} onValueChange={handleSideChange}>
          <Tabs.List className="w-full">
            <Tabs.Tab
              value="buy"
              className="flex-1 capitalize text-success data-active:bg-success-muted data-active:text-success"
            >
              {t('trade.buy')}
            </Tabs.Tab>
            <Tabs.Tab
              value="sell"
              className="flex-1 capitalize text-danger data-active:bg-danger-muted data-active:text-danger"
            >
              {t('trade.sell')}
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <Card>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs tracking-widest text-foreground-subtle uppercase">
              {t('trade.executionPrice')}
            </span>
            <GoldBadge>{t('trade.live')}</GoldBadge>
          </div>
          <p className="font-mono text-2xl font-medium text-foreground">{execPriceLabel}</p>
          <p className="mt-1 text-xs text-foreground-subtle">{spreadSpotLabel}</p>
        </Card>

        <div>
          <label className="mb-2 block text-xs tracking-widest text-foreground-subtle uppercase">
            {t('trade.amount')}
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
            {quickAmounts.map((item) => (
              <Button
                key={item.value}
                type="button"
                onClick={item.onSelect}
                className="flex-1 rounded-lg border border-border bg-transparent py-1.5 text-xs text-foreground-subtle hover:border-gold-600/30 hover:bg-surface-muted hover:text-foreground"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <Card className="space-y-3">
          <p className="text-xs tracking-widest text-foreground-subtle uppercase">
            {t('trade.orderSummary')}
          </p>
          {orderRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-sm text-foreground-subtle">{row.label}</span>
              <span className="font-mono text-sm text-foreground">{row.value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-border pt-2">
            <span className="text-sm font-semibold text-foreground">{t('trade.total')}</span>
            <span className="font-mono text-base font-semibold text-gold-600">{totalLabel}</span>
          </div>
        </Card>

        <Button
          type="button"
          onClick={handleSubmit}
          className={`w-full rounded-xl py-4 text-sm font-semibold ${submitClassName}`}
        >
          {submitLabel}
        </Button>

        <p className="text-center text-[10px] text-foreground-subtle">{t('trade.disclaimer')}</p>
      </div>
    </div>
  )
}

export default TradeView
