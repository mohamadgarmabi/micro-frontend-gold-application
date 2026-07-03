import Avatar from '@gold/shared-components/avatar'
import Button from '@gold/shared-components/button'
import { toast } from '@gold/shared-components/sonner'
import { useNavigate } from '@tanstack/react-router'
import {
  Bell,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  Info,
  LogOut,
  Shield,
  Star,
} from 'lucide-react'
import Card from '#/modules/shell/components/card'
import GoldBadge from '#/modules/shell/components/gold-badge'
import { useProfile } from '../../hooks/profile.hook'

function ProfileView() {
  const navigate = useNavigate()
  const { showBalance, setShowBalance } = useProfile()

  return (
    <div className="min-h-screen pb-24">
        <div className="bg-gradient-to-b from-gold-600/5 to-transparent px-5 pt-12 pb-8">
          <div className="flex items-center gap-4">
            <Avatar className="size-16 rounded-2xl bg-gradient-to-br from-gold-600 to-gold-700 text-xl font-bold text-foreground-on-brand">
              <Avatar.Fallback>MC</Avatar.Fallback>
            </Avatar>
            <div>
              <h2 className="aurum-serif text-xl font-semibold text-foreground">Marcus Chen</h2>
              <p className="text-sm text-foreground-subtle">marcus@example.com</p>
              <GoldBadge className="mt-1">
                <Star size={10} />
                Premium
              </GoldBadge>
            </div>
          </div>
        </div>

        <div className="space-y-4 px-5">
          <Card>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs tracking-widest text-foreground-subtle uppercase">
                Cash Balance
              </p>
              <button
                type="button"
                onClick={() => setShowBalance(!showBalance)}
                className="text-foreground-subtle transition-colors hover:text-foreground"
              >
                {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>
            <p className="font-mono text-3xl font-medium text-foreground">
              {showBalance ? '$48,250.00' : '••••••••'}
            </p>
            <p className="mt-1 text-xs text-foreground-subtle">Available to trade</p>
          </Card>

          <Card>
            <p className="mb-3 text-xs tracking-widest text-foreground-subtle uppercase">
              Holdings
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Gold', val: '5.00 oz', sub: '$16,512.25' },
                { label: 'Silver', val: '50.00 oz', sub: '$1,609.00' },
              ].map(({ label, val, sub }) => (
                <div key={label}>
                  <p className="mb-1 text-xs text-foreground-subtle">{label}</p>
                  <p className="font-mono text-sm font-medium text-foreground">{val}</p>
                  <p className="text-xs text-gold-600">{sub}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-1">
            {[
              { icon: <Shield size={16} />, label: 'Security & 2FA', sub: 'Enabled' },
              { icon: <Bell size={16} />, label: 'Price Alerts', sub: '3 active' },
              { icon: <Clock size={16} />, label: 'Transaction History', sub: '' },
              { icon: <Info size={16} />, label: 'KYC Verification', sub: 'Verified' },
            ].map(({ icon, label, sub }) => (
              <button
                key={label}
                type="button"
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface-elevated p-4 transition-all duration-200 hover:border-gold-600/30"
              >
                <span className="text-gold-600">{icon}</span>
                <span className="flex-1 text-left text-sm text-foreground">{label}</span>
                {sub && <span className="text-xs text-foreground-subtle">{sub}</span>}
                <ChevronRight size={14} className="gold-rtl-flip text-foreground-subtle" />
              </button>
            ))}
          </div>

          <Button
            type="button"
            onClick={() => {
              toast.info('از حساب خارج شدید')
              navigate({ to: '/login' })
            }}
            className="flex w-full items-center justify-start gap-3 rounded-xl border border-border bg-surface-elevated p-4 text-danger hover:border-danger/30 hover:bg-danger-muted"
          >
            <LogOut size={16} />
            <span className="text-sm">Sign Out</span>
          </Button>
        </div>
    </div>
  )
}

export default ProfileView
