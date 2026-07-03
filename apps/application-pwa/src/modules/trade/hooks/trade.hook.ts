import { useState } from 'react'

function useTrade() {
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('1.00')

  const decrementAmount = () =>
    setAmount(Math.max(0.01, parseFloat(amount) - 0.25).toFixed(2))

  const incrementAmount = () => setAmount((parseFloat(amount) + 0.25).toFixed(2))

  const setQuickAmount = (q: number) => setAmount(q.toFixed(2))

  return { side, setSide, amount, setAmount, decrementAmount, incrementAmount, setQuickAmount }
}

export { useTrade }
