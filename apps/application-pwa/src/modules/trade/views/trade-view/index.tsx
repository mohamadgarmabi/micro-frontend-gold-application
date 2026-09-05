import Button from '@gold/shared-components/button'
import Input from '@gold/shared-components/input'
import Tabs from '@gold/shared-components/tabs'
import Typography from '@gold/shared-components/typography'
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
        <Typography as="h2" size="xl" weight="semibold" className="aurum-serif mb-1">
          {t('trade.title')}
        </Typography>
        <Typography size="xs" weight="regular" color="subtle">
          {t('trade.subtitle')}
        </Typography>
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
            <Typography as="span" size="xs" weight="regular" color="subtle" className="tracking-widest uppercase">
              {t('trade.executionPrice')}
            </Typography>
            <GoldBadge>{t('trade.live')}</GoldBadge>
          </div>
          <Typography size="display" weight="medium" className="font-mono text-2xl">
            {execPriceLabel}
          </Typography>
          <Typography size="xs" weight="regular" color="subtle" className="mt-1">
            {spreadSpotLabel}
          </Typography>
        </Card>

        <div>
          <Typography
            as="label"
            size="xs"
            weight="regular"
            color="subtle"
            className="mb-2 block tracking-widest uppercase"
          >
            {t('trade.amount')}
          </Typography>
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
          <Typography size="xs" weight="regular" color="subtle" className="tracking-widest uppercase">
            {t('trade.orderSummary')}
          </Typography>
          {orderRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <Typography as="span" size="sm" color="subtle">
                {row.label}
              </Typography>
              <Typography as="span" size="sm" className="font-mono">
                {row.value}
              </Typography>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-border pt-2">
            <Typography as="span" size="sm" weight="semibold">
              {t('trade.total')}
            </Typography>
            <Typography as="span" size="md" weight="semibold" color="brand" className="font-mono">
              {totalLabel}
            </Typography>
          </div>
        </Card>

        <Button
          type="button"
          onClick={handleSubmit}
          className={`w-full rounded-xl py-4 text-sm font-semibold ${submitClassName}`}
        >
          {submitLabel}
        </Button>

        <Typography size="xs" weight="regular" color="subtle" align="center" className="text-[10px]">
          {t('trade.disclaimer')}
        </Typography>
      </div>
    </div>
  )
}

export default TradeView
