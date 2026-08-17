import { useSelector } from '@tanstack/react-store'
import { directionStore } from '../stores/direction.store'
import type { Direction, MessageKey, TranslateValues } from '../types'
import { resolveLocale, translate } from '../utils/i18n.utils'

const useI18n = () => {
  const direction = useSelector(directionStore, (state) => state)
  const locale = resolveLocale(direction as Direction)

  const t = (key: MessageKey, values?: TranslateValues) => {
    return translate(locale, key, values)
  }

  return { t, locale, direction }
}

export { useI18n }
