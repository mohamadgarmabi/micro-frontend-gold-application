import Typography from '@gold/shared-components/typography'
import { useThemeSelector } from '../hooks/theme-selector.hook'
import type { ThemePreference } from '../types'

type ThemeSelectorProps = {
  value: ThemePreference
  onChange: (value: ThemePreference) => void
}

const ThemeSelector = ({ value, onChange }: ThemeSelectorProps) => {
  const { options } = useThemeSelector({ value, onChange })

  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((option) => {
        const Icon = option.icon

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={option.isActive}
            onClick={option.onSelect}
            className={option.buttonClassName}
          >
            <span className={option.iconWrapClassName}>
              <Icon size={18} />
            </span>
            <Typography as="span" size="xs" weight="medium">
              {option.label}
            </Typography>
          </button>
        )
      })}
    </div>
  )
}

export default ThemeSelector
