import Button from '@gold/shared-components/button'
import AppShell from '../../components/app-shell'
import { useNotFound } from '../../hooks/not-found.hook'

const NotFoundView = () => {
  const { t, goHome } = useNotFound()

  return (
    <AppShell showNav={false}>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <p className="text-5xl font-semibold text-muted">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">{t('notFound.title')}</h1>
        <p className="mt-2 text-center text-sm text-muted">{t('notFound.description')}</p>
        <Button type="button" className="mt-8" onPress={goHome}>
          {t('notFound.goHome')}
        </Button>
      </div>
    </AppShell>
  )
}

export default NotFoundView
