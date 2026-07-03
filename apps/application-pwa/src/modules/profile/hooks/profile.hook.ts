import { useState } from 'react'

function useProfile() {
  const [showBalance, setShowBalance] = useState(true)

  return { showBalance, setShowBalance }
}

export { useProfile }
