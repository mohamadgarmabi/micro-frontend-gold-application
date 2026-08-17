import { useState } from 'react'

function useOptions() {
  const [notifications, setNotifications] = useState(true)
  const [biometric, setBiometric] = useState(true)
  const [priceAlert, setPriceAlert] = useState('3350')

  return {
    notifications,
    setNotifications,
    biometric,
    setBiometric,
    priceAlert,
    setPriceAlert,
  }
}

export { useOptions }
