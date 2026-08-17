import { useNavigate } from '@tanstack/react-router'
import { toast } from '@gold/shared-components/sonner'
import { useState } from 'react'
import { useAuth } from '#/modules/auth/hooks/auth.hook'

function useProfile() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [showBalance, setShowBalance] = useState(true)

  const signOut = () => {
    logout()
    toast.info('از حساب خارج شدید')
    navigate({ to: '/login', search: { redirect: '/home' } })
  }

  return { showBalance, setShowBalance, signOut }
}

export { useProfile }
