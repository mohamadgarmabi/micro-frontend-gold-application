import { useNavigate } from '@tanstack/react-router'
import { useI18n } from './i18n.hook'

const useNotFound = () => {
  const navigate = useNavigate()
  const { t } = useI18n()

  const goHome = () => {
    navigate({ to: '/' })
  }

  return { t, goHome }
}

export { useNotFound }
