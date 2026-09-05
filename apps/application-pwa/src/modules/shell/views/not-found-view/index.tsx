import Button from '@gold/shared-components/button'
import Typography from '@gold/shared-components/typography'
import AppShell from '../../components/app-shell'
import { useNotFound } from '../../hooks/not-found.hook'

const NotFoundView = () => {
  const { t, goHome } = useNotFound()

  return (
    <AppShell showNav={false}>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <Typography size="display" weight="semibold" color="muted" className="text-5xl">
          404
        </Typography>
        <Typography as="h1" size="display" weight="semibold" className="mt-4 text-2xl">
          {t('notFound.title')}
        </Typography>
        <Typography size="sm" color="muted" align="center" className="mt-2">
          {t('notFound.description')}
        </Typography>
        <Button type="button" className="mt-8" onPress={goHome}>
          {t('notFound.goHome')}
        </Button>
      </div>
    </AppShell>
  )
}

export default NotFoundView
