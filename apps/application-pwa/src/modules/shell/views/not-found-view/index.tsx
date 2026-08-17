import Button from '@gold/shared-components/button'
import AppShell from '../../components/app-shell'
import { useNotFound } from '../../hooks/not-found.hook'

const NotFoundView = () => {
  const { t, goHome } = useNotFound()

  return (
    <AppShell showNav={false}>
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <p className="aurum-serif text-5xl font-semibold text-gold-600">404</p>
        <h1 className="aurum-serif mt-4 text-2xl font-semibold text-foreground">
          {t('notFound.title')}
        </h1>
        <p className="mt-2 text-center text-sm text-foreground-subtle">
          {t('notFound.description')}
        </p>
        <Button type="button" onClick={goHome} className="mt-8 rounded-xl px-6 py-3.5">
          {t('notFound.goHome')}
        </Button>
      </div>
    </AppShell>
  )
}

export default NotFoundView
