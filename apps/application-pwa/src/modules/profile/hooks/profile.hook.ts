import { toast } from '@gold/shared-components/sonner'
import { useNavigate } from '@tanstack/react-router'
import { Bell, Clock, Eye, EyeOff, Info, Shield } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '#/modules/auth/hooks/auth.hook'
import { useI18n } from '#/modules/shell/hooks/i18n.hook'
import type { HoldingRow, ProfileMenuItem } from '../types'

const useProfile = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { t } = useI18n()
  const [showBalance, setShowBalance] = useState(true)

  const toggleBalance = () => {
    setShowBalance((current) => !current)
  }

  const signOut = () => {
    logout()
    toast.info(t('profile.signedOut'))
    navigate({ to: '/login', search: { redirect: '/home' } })
  }

  const balanceLabel = showBalance ? '$48,250.00' : '••••••••'
  const BalanceIcon = showBalance ? Eye : EyeOff

  const holdings: HoldingRow[] = [
    { label: t('profile.gold'), value: '5.00 oz', sub: '$16,512.25' },
    { label: t('profile.silver'), value: '50.00 oz', sub: '$1,609.00' },
  ]

  const menuItems: ProfileMenuItem[] = [
    {
      id: 'security',
      icon: Shield,
      label: t('profile.security'),
      sub: t('profile.securityEnabled'),
    },
    {
      id: 'alerts',
      icon: Bell,
      label: t('profile.priceAlerts'),
      sub: t('profile.priceAlertsActive'),
    },
    { id: 'history', icon: Clock, label: t('profile.transactionHistory'), sub: '' },
    { id: 'kyc', icon: Info, label: t('profile.kyc'), sub: t('profile.kycVerified') },
  ]

  return {
    t,
    showBalance,
    BalanceIcon,
    toggleBalance,
    signOut,
    balanceLabel,
    holdings,
    menuItems,
  }
}

export { useProfile }
