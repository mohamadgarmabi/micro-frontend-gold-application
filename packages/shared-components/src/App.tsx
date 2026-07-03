import { Button } from './components/button';
import { Input } from './components/input';
import { Checkbox } from './components/checkbox';
import { Switch } from './components/switch';
import { Tabs } from './components/tabs';
import { Dialog } from './components/dialog';
import { componentManifest } from './component-manifest';

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16v12H4z" />
    <path d="M4 8l8 5 8-5" />
  </svg>
);

export function App() {
  return (
    <div className="gold-root min-h-screen bg-gradient-to-br from-gold-50 via-surface to-gold-100">
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 p-8">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">
            @gold/shared-components
          </p>
          <h1 className="mt-2 text-3xl font-bold text-foreground">
            Base UI + Gold Design System
          </h1>
          <p className="mt-2 text-foreground-muted">
            {componentManifest.length} federated components powered by{' '}
            <code className="rounded bg-gold-100 px-1.5 py-0.5 text-sm">
              @base-ui/react
            </code>
          </p>
        </header>

        <section className="grid gap-6 rounded-2xl border border-gold-500/20 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<MailIcon />}>With icon</Button>
            <Button loading>Saving</Button>
            <Button className="border border-gold-500/40 bg-white text-gold-700 hover:bg-gold-50">
              Secondary
            </Button>
          </div>

          <Input placeholder="Email address" leftIcon={<MailIcon />} />

          <Input
            placeholder="you@example.com"
            leftIcon={<MailIcon />}
            error
            errorMessage="Invalid email address"
            defaultValue="bad@"
          />

          <label className="flex items-center gap-2 text-sm text-foreground-muted">
            <Checkbox />
            Accept terms
          </label>

          <label className="flex items-center gap-2 text-sm text-foreground-muted">
            <Switch />
            Notifications
          </label>

          <Tabs defaultValue="overview">
            <Tabs.List>
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="settings">Settings</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview" className="text-sm text-foreground-muted">
              Base UI primitives styled with Gold tokens.
            </Tabs.Panel>
            <Tabs.Panel value="settings" className="text-sm text-foreground-muted">
              Module Federation remote on port 5100.
            </Tabs.Panel>
          </Tabs>

          <Dialog>
            <Dialog.Trigger>Open dialog</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
                <Dialog.Title>Gold Dialog</Dialog.Title>
                <Dialog.Description className="mt-2">
                  Built with Base UI Dialog primitive.
                </Dialog.Description>
                <div className="mt-4 flex justify-end gap-2">
                  <Dialog.Close className="rounded-lg px-4 py-2 text-sm">
                    Close
                  </Dialog.Close>
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog>
        </section>
      </main>
    </div>
  );
}

export default App;
