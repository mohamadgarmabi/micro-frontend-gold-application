# Gold

Nx monorepo with **Tailwind CSS v4 design tokens**, **Base UI** shared components, and sample **React** + **Vue** apps.

## Structure

```
packages/
  design-system/       # Tailwind v4 tokens + Base UI global CSS
  shared-components/   # 38 Base UI components — Module Federation provider
apps/
  react-sample/        # React consumer
  vue-sample/          # Vue consumer (loads React remotes)
```

## Packages

| Package | Description |
|---------|-------------|
| `@gold/design-system` | Gold tokens, Base UI portal setup, component utilities |
| `@gold/shared-components` | Styled `@base-ui/react` components (MF remote, port **5100**) |

## Base UI components (38)

All exposed via Module Federation as `shared_components/<Name>`:

Accordion, AlertDialog, Autocomplete, Avatar, Button, Checkbox, CheckboxGroup, Collapsible, Combobox, ContextMenu, Dialog, Drawer, Field, Fieldset, Form, Input, Menu, Menubar, Meter, NavigationMenu, NumberField, OTPField, Popover, PreviewCard, Progress, Radio, RadioGroup, ScrollArea, Select, Separator, Slider, Switch, Tabs, Toast, Toggle, ToggleGroup, Toolbar, Tooltip

Regenerate wrappers after Base UI updates:

```bash
pnpm generate:components
```

## Getting started

```bash
pnpm install
pnpm dev:react   # or: nx dev react-sample
```

- React: http://localhost:4200
- Vue: http://localhost:4300
- Shared components: http://localhost:5100

```bash
pnpm stop        # free ports 4200, 4300, 5100
```

### Run individually

```bash
nx dev react-sample    # design-system → shared-components → react
nx dev vue-sample
nx dev shared-components
```

## Usage in apps

Import design system CSS:

```css
@import '@gold/design-system/styles.css';
```

Load federated components:

```tsx
import { lazyRemote } from './mf';

const Button = lazyRemote('shared_components', 'Button');
const Dialog = lazyRemote('shared_components', 'Dialog');

// Compound components keep Base UI API:
// <Dialog><Dialog.Trigger>...</Dialog.Trigger></Dialog>
```

Wrap app root with `gold-root` class for correct popup stacking (Base UI requirement).

## Build

```bash
pnpm build
```
