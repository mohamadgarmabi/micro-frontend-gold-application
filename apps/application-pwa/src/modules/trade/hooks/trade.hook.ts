import { toast } from '@gold/shared-components/sonner'
import { useState } from 'react'
import { SPOT_PRICE } from '#/modules/market/utils/data'
import { fmt } from '#/modules/market/utils/format'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import type { OrderRow, QuickAmount, TradeSide } from '../types'

const QUICK_AMOUNTS = [0.5, 1, 2, 5]
const SPREAD = 2.5
const FEE_RATE = 0.0015

const useTrade = () => {
  const { t } = useI18n()
  const [side, setSide] = useState<TradeSide>('buy')
  const [amount, setAmount] = useState('1.00')
  const numericAmount = parseFloat(amount || '0')
  const execPrice = side === 'buy' ? SPOT_PRICE + SPREAD / 2 : SPOT_PRICE - SPREAD / 2
  const total = numericAmount * execPrice
  const fee = total * FEE_RATE
  const formattedAmount = numericAmount.toFixed(2)
  const isBuy = side === 'buy'

  const decrementAmount = () => {
    setAmount(Math.max(0.01, numericAmount - 0.25).toFixed(2))
  }

  const incrementAmount = () => {
    setAmount((numericAmount + 0.25).toFixed(2))
  }

  const setQuickAmount = (value: number) => {
    setAmount(value.toFixed(2))
  }

  const handleSideChange = (value: string) => {
    setSide(value as TradeSide)
  }

  const handleSubmit = () => {
    toast.success(t(isBuy ? 'trade.buyToast' : 'trade.sellToast', { amount }))
  }

  const quickAmounts: QuickAmount[] = QUICK_AMOUNTS.map((value) => ({
    value,
    label: t('trade.quickAmount', { amount: value }),
    onSelect: () => setQuickAmount(value),
  }))

  const orderRows: OrderRow[] = [
    { label: t('trade.quantity'), value: t('trade.quantityValue', { amount: formattedAmount }) },
    { label: t('trade.price'), value: t('trade.priceValue', { price: fmt(execPrice) }) },
    { label: t('trade.subtotal'), value: `$${fmt(total)}` },
    { label: t('trade.fee'), value: `$${fmt(fee)}` },
  ]

  return {
    t,
    side,
    amount,
    setAmount,
    decrementAmount,
    incrementAmount,
    handleSideChange,
    handleSubmit,
    execPriceLabel: `$${fmt(execPrice)}`,
    spreadSpotLabel: t('trade.spreadSpot', { spread: fmt(SPREAD), spot: fmt(SPOT_PRICE) }),
    totalLabel: `$${fmt(total + fee)}`,
    submitLabel: t(isBuy ? 'trade.buyAction' : 'trade.sellAction', { amount }),
    submitClassName: isBuy
      ? 'bg-success text-white shadow-lg shadow-success/25 hover:bg-success/90'
      : 'bg-danger text-white shadow-lg shadow-danger/25 hover:bg-danger/90',
    quickAmounts,
    orderRows,
  }
}

export { useTrade }
