import type { Direction, Locale, MessageKey, TranslateValues } from '../types'
import { enMessages } from './i18n.en'
import { faMessages } from './i18n.fa'

const messages = {
  en: enMessages,
  fa: faMessages,
} as const

const resolveLocale = (direction: Direction): Locale => {
  return direction === 'rtl' ? 'fa' : 'en'
}

const interpolate = (template: string, values?: TranslateValues) => {
  if (!values) {
    return template
  }

  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = values[key]
    return value === undefined ? `{${key}}` : String(value)
  })
}

const translate = (locale: Locale, key: MessageKey, values?: TranslateValues) => {
  return interpolate(messages[locale][key], values)
}

export { resolveLocale, translate }
