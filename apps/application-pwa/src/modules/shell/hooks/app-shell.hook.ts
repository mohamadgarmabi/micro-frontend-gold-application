import { useRouter } from '@tanstack/react-router'
import type { AppShellModel } from '../types'
import { useI18n } from './i18n.hook'

const useAppShell = (): AppShellModel => {
  const router = useRouter()
  const { t } = useI18n()

  const onRefresh = async () => {
    const queryClient = router.options.context.queryClient

    await Promise.all([router.invalidate(), queryClient.invalidateQueries()])
  }

  return {
    onRefresh,
    pullRefreshLabels: {
      pull: t('pullRefresh.pull'),
      release: t('pullRefresh.release'),
      refreshing: t('pullRefresh.refreshing'),
    },
  }
}

export { useAppShell }
