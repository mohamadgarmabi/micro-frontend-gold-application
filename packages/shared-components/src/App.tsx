import Button from './components/button';
import Input from './components/input';
import Checkbox from './components/checkbox';
import Switch from './components/switch';
import Tabs from './components/tabs';
import Dialog from './components/dialog';
import { componentManifest } from './component-manifest';

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16v12H4z" />
    <path d="M4 8l8 5 8-5" />
  </svg>
);

const App = () => {
  return (
    <div className="bg-gradient-to-br from-gold-50 via-surface to-gold-100 min-h-screen gold-root">
      <main className="flex flex-col gap-8 mx-auto p-8 max-w-3xl min-h-screen">
        <header>
          <p className="font-semibold text-gold-700 text-xs uppercase tracking-wide">
            @gold/shared-components
          </p>
          <h1 className="mt-2 font-bold text-foreground text-3xl">
            HeroUI + Gold Design System
          </h1>
          <p className="mt-2 text-foreground-muted">
            {componentManifest.length} federated components powered by{' '}
            <code className="bg-gold-100 px-1.5 py-0.5 rounded text-sm">
              @heroui/react
            </code>
          </p>
        </header>

        <section className="gap-6 grid bg-white shadow-sm p-6 border border-gold-500/20 rounded-2xl">
          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<MailIcon />}>With icon</Button>
            <Button loading>Saving</Button>
            <Button className="bg-white hover:bg-gold-50 border border-gold-500/40 text-gold-700">
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

          <label className="flex items-center gap-2 text-foreground-muted text-sm">
            <Checkbox />
            Accept terms
          </label>

          <label className="flex items-center gap-2 text-foreground-muted text-sm">
            <Switch />
            Notifications
          </label>

          <Tabs defaultValue="overview">
            <Tabs.List>
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="settings">Settings</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview" className="text-foreground-muted text-sm">
              HeroUI primitives styled with Gold tokens.
            </Tabs.Panel>
            <Tabs.Panel value="settings" className="text-foreground-muted text-sm">
              Module Federation remote on port 5100.
            </Tabs.Panel>
          </Tabs>

          <Dialog>
            <Dialog.Trigger>Open dialog</Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Container>
              <Dialog.Dialog>
                <Dialog.Header>
                  <Dialog.Heading>Gold Dialog</Dialog.Heading>
                </Dialog.Header>
                <Dialog.Body className="text-foreground-muted text-sm">
                  Built with HeroUI Modal primitive.
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
                </Dialog.Footer>
              </Dialog.Dialog>
            </Dialog.Container>
          </Dialog>
        </section>
      </main>
    </div>
  );
}

export default App;

export { App }
