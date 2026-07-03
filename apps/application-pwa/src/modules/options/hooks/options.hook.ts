import { useState } from 'react'

function useOptions() {
  const [notifications, setNotifications] = useState(true)
  const [biometric, setBiometric] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [priceAlert, setPriceAlert] = useState('3350')

  return {
    notifications,
    setNotifications,
    biometric,
    setBiometric,
    darkMode,
    setDarkMode,
    priceAlert,
    setPriceAlert,
  }
}

export { useOptions }
