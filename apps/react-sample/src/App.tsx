import { Component, Suspense, type ReactNode } from 'react';
import { GeneratedForm, LockIcon, MailIcon, defineFormSchema } from '@gold/form';
import { lazyRemote } from './mf';

const loginSchema = defineFormSchema([
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'you@example.com',
    required: true,
    leftIcon: <MailIcon />,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: '••••••••',
    required: true,
    leftIcon: <LockIcon />,
  },
  {
    name: 'remember',
    type: 'checkbox',
    label: 'Remember me',
  },
]);

class RemoteBoundary extends Component<
  { children: ReactNode; name: string },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          Remote &quot;{this.props.name}&quot; unavailable:{' '}
          {this.state.error.message}
        </div>
      );
    }

    return (
      <Suspense fallback={<p className="text-sm text-foreground-subtle">Loading…</p>}>
        {this.props.children}
      </Suspense>
    );
  }
}

const RemoteButton = lazyRemote('shared_components', 'Button');
const RemoteInput = lazyRemote('shared_components', 'Input');
const RemoteCheckbox = lazyRemote('shared_components', 'Checkbox');

export function App() {
  return (
    <div className="gold-root min-h-screen bg-gradient-to-br from-gold-50 via-surface to-gold-100">
      <main className="mx-auto flex min-h-screen max-w-lg flex-col gap-6 p-8">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">
            React Sample
          </p>
          <h1 className="mt-2 text-3xl font-bold text-foreground">
            Base UI via Module Federation
          </h1>
          <p className="mt-2 text-foreground-muted">
            Components from{' '}
            <code className="rounded bg-gold-100 px-1.5 py-0.5 text-sm">
              @gold/shared-components
            </code>{' '}
            — forms from{' '}
            <code className="rounded bg-gold-100 px-1.5 py-0.5 text-sm">
              @gold/form
            </code>
          </p>
        </header>

        <section className="flex flex-col gap-4 rounded-2xl border border-gold-500/20 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground">
            Generated form (TanStack Form)
          </h2>
          <GeneratedForm
            fields={loginSchema}
            submitLabel="Sign in"
            onSubmit={async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 800));
              console.log('submit', values);
            }}
          />
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-gold-500/20 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground">
            Federated components
          </h2>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground-muted">Username</span>
            <RemoteBoundary name="Input">
              <RemoteInput placeholder="Enter your name" />
            </RemoteBoundary>
          </label>

          <label className="flex items-center gap-2 text-sm text-foreground-muted">
            <RemoteBoundary name="Checkbox">
              <RemoteCheckbox />
            </RemoteBoundary>
            Remember me
          </label>

          <RemoteBoundary name="Button">
            <div className="flex gap-3">
              <RemoteButton>Submit</RemoteButton>
              <RemoteButton className="border border-gold-500/40 bg-white text-gold-700 hover:bg-gold-50">
                Cancel
              </RemoteButton>
            </div>
          </RemoteBoundary>
        </section>
      </main>
    </div>
  );
}

export default App;
