import { Monitor, Moon, Sun } from 'lucide-react'
import type { ThemePreference } from '../types'

type ThemeSelectorProps = {
  value: ThemePreference
  onChange: (value: ThemePreference) => void
}

const themeOptions: {
  value: ThemePreference
  label: string
  sublabel: string
  icon: typeof Sun
}[] = [
  { value: 'light', label: 'Light', sublabel: 'روشن', icon: Sun },
  { value: 'dark', label: 'Dark', sublabel: 'تاریک', icon: Moon },
  { value: 'system', label: 'System', sublabel: 'سیستم', icon: Monitor },
]

function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {themeOptions.map(({ value: optionValue, label, sublabel, icon: Icon }) => {
        const active = value === optionValue

        return (
          <button
            key={optionValue}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(optionValue)}
            className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-3 transition-all duration-200 ${
              active
                ? 'border-gold-600/40 bg-gold-600/10 text-foreground shadow-[var(--ds-shadow-focus)]'
                : 'border-border bg-surface text-foreground-subtle hover:border-gold-600/20 hover:text-foreground'
            }`}
          >
            <span
              className={`flex size-9 items-center justify-center rounded-full ${
                active ? 'bg-gold-600/15 text-gold-600' : 'bg-surface-muted text-foreground-subtle'
              }`}
            >
              <Icon size={18} />
            </span>
            <span className="text-xs font-medium">{label}</span>
            <span className="text-[10px] text-foreground-subtle">{sublabel}</span>
          </button>
        )
      })}
    </div>
  )
}

export default ThemeSelector
