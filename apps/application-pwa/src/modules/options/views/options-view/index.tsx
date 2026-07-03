import Button from '@gold/shared-components/button'
import Input from '@gold/shared-components/input'
import { toast } from '@gold/shared-components/sonner'
import { Check, ChevronRight, Clock } from 'lucide-react'
import Card from '#/modules/shell/components/card'
import GoldBadge from '#/modules/shell/components/gold-badge'
import Toggle from '#/modules/shell/components/toggle'
import { useDirection } from '#/modules/shell/hooks/direction.hook'
import { useOptions } from '../../hooks/options.hook'

function OptionsView() {
  const {
    notifications,
    setNotifications,
    biometric,
    setBiometric,
    darkMode,
    setDarkMode,
    priceAlert,
    setPriceAlert,
  } = useOptions()
  const { isRtl, setDirection } = useDirection()

  const handleDirectionChange = (rtl: boolean) => {
    setDirection(rtl ? 'rtl' : 'ltr')
    toast.info(rtl ? 'جهت نمایش: راست به چپ' : 'Layout direction: left to right')
  }

  return (
    <div className="min-h-screen pb-24">
        <div className="px-5 pt-12 pb-6">
          <h2 className="aurum-serif text-xl font-semibold text-foreground">Settings</h2>
          <p className="mt-1 text-xs text-foreground-subtle">Preferences & configuration</p>
        </div>

        <div className="space-y-5 px-5">
          <div>
            <p className="mb-2 text-xs tracking-widest text-foreground-subtle uppercase">
              Appearance
            </p>
            <div className="space-y-1">
              <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
                <div>
                  <p className="text-sm text-foreground">راست به چپ (RTL)</p>
                  <p className="text-xs text-foreground-subtle">جهت نمایش و فونت وزیرمتن</p>
                </div>
                <Toggle value={isRtl} onChange={handleDirectionChange} />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
                <span className="text-sm text-foreground">Dark Mode</span>
                <Toggle value={darkMode} onChange={setDarkMode} />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
                <div>
                  <p className="text-sm text-foreground">Currency Display</p>
                  <p className="text-xs text-foreground-subtle">Primary denomination</p>
                </div>
                <select className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground focus:border-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-600/20">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>AED</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs tracking-widest text-foreground-subtle uppercase">
              Notifications
            </p>
            <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
              <div>
                <p className="text-sm text-foreground">Push Notifications</p>
                <p className="text-xs text-foreground-subtle">Price alerts & order fills</p>
              </div>
              <Toggle value={notifications} onChange={setNotifications} />
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs tracking-widest text-foreground-subtle uppercase">
              Price Alert
            </p>
            <Card>
              <p className="mb-3 text-sm text-foreground">Alert me when XAU/USD reaches</p>
              <div className="flex gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-surface-muted px-4 py-3">
                  <span className="text-sm text-foreground-subtle">$</span>
                  <Input
                    type="number"
                    value={priceAlert}
                    onValueChange={setPriceAlert}
                    className="border-0 bg-transparent p-0 font-mono text-sm shadow-none focus:ring-0"
                  />
                </div>
                <Button type="button" className="rounded-xl px-4 py-3 text-sm" onClick={() => toast.success('هشدار قیمت ثبت شد')}>
                  Set
                </Button>
              </div>
              <div className="mt-3 space-y-2">
                {[
                  { price: '$3,400', dir: 'Above', active: true },
                  { price: '$3,200', dir: 'Below', active: true },
                  { price: '$3,100', dir: 'Below', active: false },
                ].map((a, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded-lg p-2.5 ${a.active ? 'bg-gold-600/10' : 'opacity-50'}`}
                  >
                    <div className="flex items-center gap-2">
                      {a.active ? (
                        <Check size={12} className="text-gold-600" />
                      ) : (
                        <Clock size={12} className="text-foreground-subtle" />
                      )}
                      <span className="font-mono text-xs text-foreground">{a.price}</span>
                      <span className="text-xs text-foreground-subtle">{a.dir}</span>
                    </div>
                    <button type="button" className="text-xs text-danger hover:opacity-70">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <p className="mb-2 text-xs tracking-widest text-foreground-subtle uppercase">
              Security
            </p>
            <div className="space-y-1">
              <div className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4">
                <div>
                  <p className="text-sm text-foreground">Biometric Login</p>
                  <p className="text-xs text-foreground-subtle">Face ID / Fingerprint</p>
                </div>
                <Toggle value={biometric} onChange={setBiometric} />
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl border border-border bg-surface-elevated p-4 transition-all hover:border-gold-600/30"
              >
                <span className="text-sm text-foreground">Change PIN</span>
                <ChevronRight size={14} className="gold-rtl-flip text-foreground-subtle" />
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl border border-border bg-surface-elevated p-4 transition-all hover:border-gold-600/30"
              >
                <span className="text-sm text-foreground">Two-Factor Authentication</span>
                <div className="flex items-center gap-2">
                  <GoldBadge>Active</GoldBadge>
                  <ChevronRight size={14} className="gold-rtl-flip text-foreground-subtle" />
                </div>
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs tracking-widest text-foreground-subtle uppercase">About</p>
            <div className="space-y-1">
              {['Terms of Service', 'Privacy Policy', 'Regulatory Disclosures'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-surface-elevated p-4 transition-all hover:border-gold-600/30"
                >
                  <span className="text-sm text-foreground">{item}</span>
                  <ChevronRight size={14} className="gold-rtl-flip text-foreground-subtle" />
                </button>
              ))}
              <div className="p-4 text-center text-xs text-foreground-subtle">
                Aurum v2.4.1 · Licensed Commodity Broker
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default OptionsView
