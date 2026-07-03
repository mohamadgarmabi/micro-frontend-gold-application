import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'packages/shared-components/src/component-manifest.ts');
const storiesDir = path.join(root, 'apps/storybook/src/stories');

const manifest = JSON.parse(
  fs.readFileSync(manifestPath, 'utf8').match(/const componentManifest = (\[[\s\S]*?\])\s+as const/)[1],
);

const SKIP = new Set([
  'Button',
  'Input',
  'Checkbox',
  'Switch',
  'Tabs',
  'Dialog',
]);

const STORY_BODY = {
  badge: `export const Default: Story = { args: { children: 'Gold', variant: 'brand' } };
export const Success: Story = { args: { children: 'Verified', variant: 'success' } };`,

  card: `export const Default: Story = {
  args: { children: 'Card content with Gold design tokens.', className: 'p-4' },
};`,

  'price-display': `export const Default: Story = { args: { value: 3302.45, change: 1.28, size: 'lg' } };
export const Small: Story = { args: { value: 2150, change: -0.42, size: 'sm' } };`,

  separator: `export const Horizontal: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <p className="text-sm text-foreground-muted">Above</p>
      <Separator />
      <p className="text-sm text-foreground-muted">Below</p>
    </div>
  ),
};`,

  progress: `export const Default: Story = { render: () => <Progress value={60} /> };`,
  meter: `export const Default: Story = { render: () => <Meter value={0.7} /> };`,
  slider: `export const Default: Story = { render: () => <Slider defaultValue={40} className="w-64" /> };`,

  toggle: `export const Default: Story = { render: () => <Toggle>Toggle me</Toggle> };`,

  radio: `export const Default: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm text-foreground-muted">
      <Radio value="a" />
      Option A
    </label>
  ),
};`,

  avatar: `export const Default: Story = {
  render: () => (
    <Avatar className="size-12">
      <Avatar.Fallback>MC</Avatar.Fallback>
    </Avatar>
  ),
};`,

  accordion: `export const Default: Story = {
  render: () => (
    <Accordion className="w-80">
      <Accordion.Item value="one">
        <Accordion.Header>
          <Accordion.Trigger>Section one</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>First panel content.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="two">
        <Accordion.Header>
          <Accordion.Trigger>Section two</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>Second panel content.</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
};`,

  collapsible: `export const Default: Story = {
  render: () => (
    <Collapsible className="w-80">
      <Collapsible.Trigger className="text-sm font-medium">Toggle content</Collapsible.Trigger>
      <Collapsible.Panel className="mt-2 text-sm text-foreground-muted">
        Hidden content revealed on click.
      </Collapsible.Panel>
    </Collapsible>
  ),
};`,

  'alert-dialog': `export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger>Delete item</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2">
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description className="mt-2">
            This action cannot be undone.
          </AlertDialog.Description>
          <div className="mt-4 flex justify-end gap-2">
            <AlertDialog.Close className="rounded-lg px-4 py-2 text-sm">Cancel</AlertDialog.Close>
            <AlertDialog.Close className="rounded-lg bg-danger px-4 py-2 text-sm text-white">
              Delete
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog>
  ),
};`,

  drawer: `export const Default: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger>Open drawer</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Popup className="fixed inset-x-0 bottom-0 rounded-t-2xl p-6">
          <Drawer.Title>Drawer title</Drawer.Title>
          <Drawer.Description className="mt-2 text-sm text-foreground-muted">
            Slide-up panel content.
          </Drawer.Description>
          <Drawer.Close className="mt-4 rounded-lg px-4 py-2 text-sm">Close</Drawer.Close>
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer>
  ),
};`,

  popover: `export const Default: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger className="rounded-lg border border-border px-4 py-2 text-sm">
        Open popover
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="rounded-lg border border-border p-4 text-sm">
            Popover content
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover>
  ),
};`,

  tooltip: `export const Default: Story = {
  render: () => (
    <Tooltip>
      <Tooltip.Trigger className="rounded-lg border border-border px-4 py-2 text-sm">
        Hover me
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner sideOffset={8}>
          <Tooltip.Popup className="rounded-lg px-3 py-1.5 text-sm">Tooltip text</Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip>
  ),
};`,

  select: `export const Default: Story = {
  render: () => (
    <Select defaultValue="gold">
      <Select.Trigger className="w-48">
        <Select.Value />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List>
              <Select.Item value="gold">Gold</Select.Item>
              <Select.Item value="silver">Silver</Select.Item>
              <Select.Item value="platinum">Platinum</Select.Item>
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select>
  ),
};`,

  menu: `export const Default: Story = {
  render: () => (
    <Menu>
      <Menu.Trigger className="rounded-lg border border-border px-4 py-2 text-sm">
        Open menu
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Item>Sign out</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu>
  ),
};`,

  'context-menu': `export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenu.Trigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed border-border text-sm text-foreground-muted">
        Right click here
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner>
          <ContextMenu.Popup>
            <ContextMenu.Item>Copy</ContextMenu.Item>
            <ContextMenu.Item>Paste</ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu>
  ),
};`,

  'checkbox-group': `export const Default: Story = {
  render: () => (
    <CheckboxGroup defaultValue={['a']} className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm">
        <Checkbox value="a" />
        Option A
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox value="b" />
        Option B
      </label>
    </CheckboxGroup>
  ),
};`,

  'radio-group': `export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="a" className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm">
        <Radio value="a" />
        Option A
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Radio value="b" />
        Option B
      </label>
    </RadioGroup>
  ),
};`,

  'toggle-group': `export const Default: Story = {
  render: () => (
    <ToggleGroup defaultValue={['bold']} className="flex gap-1">
      <Toggle value="bold">B</Toggle>
      <Toggle value="italic">I</Toggle>
      <Toggle value="underline">U</Toggle>
    </ToggleGroup>
  ),
};`,

  'scroll-area': `export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-lg border border-border">
      <ScrollArea.Viewport>
        <ScrollArea.Content className="p-4 text-sm text-foreground-muted">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>Line {i + 1}</p>
          ))}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea>
  ),
};`,

  'number-field': `export const Default: Story = {
  render: () => (
    <NumberField defaultValue={42} className="w-40">
      <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
      </NumberField.Group>
    </NumberField>
  ),
};`,

  'otp-field': `export const Default: Story = {
  render: () => (
    <OTPField maxLength={6}>
      <OTPField.Input />
    </OTPField>
  ),
};`,

  toolbar: `export const Default: Story = {
  render: () => (
    <Toolbar className="flex gap-1 rounded-lg border border-border p-1">
      <Toolbar.Button>Bold</Toolbar.Button>
      <Toolbar.Button>Italic</Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.Button>Link</Toolbar.Button>
    </Toolbar>
  ),
};`,

  sonner: `export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <Button onClick={() => toast.success('Saved successfully')}>Show toast</Button>
    </>
  ),
};`,

  toast: `function ToastDemo() {
  const { add } = Toast.useToastManager();

  return (
    <Toast.Provider>
      <Button
        type="button"
        onClick={() => add({ title: 'Saved', description: 'Your changes were saved.' })}
      >
        Show toast
      </Button>
      <Toast.Viewport />
    </Toast.Provider>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};`,

  field: `export const Default: Story = {
  render: () => (
    <Field.Root name="email" className="w-80 space-y-1">
      <Field.Label className="text-sm font-medium">Email</Field.Label>
      <Field.Control placeholder="you@example.com" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
      <Field.Description className="text-xs text-foreground-muted">
        We will never share your email.
      </Field.Description>
    </Field.Root>
  ),
};`,

  fieldset: `export const Default: Story = {
  render: () => (
    <Fieldset.Root className="w-80 space-y-3 rounded-lg border border-border p-4">
      <Fieldset.Legend className="text-sm font-medium">Shipping</Fieldset.Legend>
      <Field.Root name="city">
        <Field.Label className="text-sm">City</Field.Label>
        <Field.Control placeholder="Tehran" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
      </Field.Root>
    </Fieldset.Root>
  ),
};`,

  form: `export const Default: Story = {
  render: () => (
    <Form
      className="w-80 space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Field.Root name="email">
        <Field.Label className="text-sm font-medium">Email</Field.Label>
        <Field.Control placeholder="you@example.com" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
      </Field.Root>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </Form>
  ),
};`,

  menubar: `export const Default: Story = {
  render: () => (
    <Menubar className="flex gap-1 rounded-lg border border-border p-1">
      <Menu>
        <Menu.Trigger className="rounded px-3 py-1.5 text-sm">File</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Item>New tab</Menu.Item>
              <Menu.Item>New window</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu>
      <Menu>
        <Menu.Trigger className="rounded px-3 py-1.5 text-sm">Edit</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Item>Undo</Menu.Item>
              <Menu.Item>Redo</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu>
    </Menubar>
  ),
};`,

  'navigation-menu': `export const Default: Story = {
  render: () => (
    <NavigationMenu className="w-full max-w-md">
      <NavigationMenu.List className="flex gap-2">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="rounded-lg px-3 py-2 text-sm">
            Products
          </NavigationMenu.Trigger>
          <NavigationMenu.Portal>
            <NavigationMenu.Positioner>
              <NavigationMenu.Popup className="rounded-lg border border-border p-4 text-sm">
                Gold, silver, and platinum instruments.
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#" className="rounded-lg px-3 py-2 text-sm no-underline">
            Pricing
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  ),
};`,

  'preview-card': `export const Default: Story = {
  render: () => (
    <PreviewCard>
      <PreviewCard.Trigger className="rounded-lg border border-border px-4 py-2 text-sm">
        Hover for preview
      </PreviewCard.Trigger>
      <PreviewCard.Portal>
        <PreviewCard.Positioner sideOffset={8}>
          <PreviewCard.Popup className="w-64 rounded-lg border border-border p-4 text-sm">
            Preview card content with extra details.
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard>
  ),
};`,

  autocomplete: `const metals = ['Gold', 'Silver', 'Platinum', 'Palladium'];

export const Default: Story = {
  render: () => (
    <Autocomplete className="w-64">
      <Autocomplete.Input placeholder="Search metals" />
      <Autocomplete.Portal>
        <Autocomplete.Positioner>
          <Autocomplete.Popup>
            <Autocomplete.List>
              {metals.map((metal) => (
                <Autocomplete.Item key={metal} value={metal}>
                  {metal}
                </Autocomplete.Item>
              ))}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete>
  ),
};`,

  combobox: `const metals = ['Gold', 'Silver', 'Platinum', 'Palladium'];

export const Default: Story = {
  render: () => (
    <Combobox className="w-64">
      <Combobox.Input placeholder="Pick a metal" />
      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup>
            <Combobox.List>
              {metals.map((metal) => (
                <Combobox.Item key={metal} value={metal}>
                  {metal}
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox>
  ),
};`,
};

const EXTRA_IMPORTS = {
  sonner: `import Button from '@gold/shared-components/button';`,
  toast: `import Button from '@gold/shared-components/button';`,
  'checkbox-group': `import Checkbox from '@gold/shared-components/checkbox';`,
  'radio-group': `import Radio from '@gold/shared-components/radio';`,
  'toggle-group': `import Toggle from '@gold/shared-components/toggle';`,
  fieldset: `import Field from '@gold/shared-components/field';`,
  form: `import Button from '@gold/shared-components/button';
import Field from '@gold/shared-components/field';`,
  menubar: `import Menu from '@gold/shared-components/menu';`,
};

function storyFile({ slug, name }) {
  const extraImport = EXTRA_IMPORTS[slug] ?? '';
  const importLine =
    slug === 'sonner'
      ? `import Toaster, { toast } from '@gold/shared-components/sonner';`
      : `import ${name} from '@gold/shared-components/${slug}';`;

  const body =
    STORY_BODY[slug] ??
    `export const Default: Story = {
  render: () => <${name}>${name} demo</${name}>,
};`;

  return `import type { Meta, StoryObj } from '@storybook/react-vite';
${importLine}
${extraImport}

const meta = {
  title: 'Components/${name}',
  component: ${name},
  tags: ['autodocs'],
} satisfies Meta<typeof ${name}>;

export default meta;
type Story = StoryObj<typeof meta>;

${body}
`;
}

fs.mkdirSync(storiesDir, { recursive: true });

let created = 0;
let skipped = 0;

for (const entry of manifest) {
  const { name } = entry;
  if (SKIP.has(name)) {
    skipped += 1;
    continue;
  }

  const filePath = path.join(storiesDir, `${name}.stories.tsx`);
  if (fs.existsSync(filePath)) {
    skipped += 1;
    continue;
  }

  fs.writeFileSync(filePath, storyFile(entry));
  created += 1;
  console.log(`Created ${name}.stories.tsx`);
}

console.log(`Done: ${created} created, ${skipped} skipped.`);
