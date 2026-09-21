# Gold

Nx monorepo with **Tailwind CSS v4 design tokens**, **HeroUI** shared components, and sample **React** + **Vue** apps.

## Structure

```
packages/
  design-system/       # Tailwind v4 tokens + global CSS
  shared-components/   # Shared UI components — Module Federation provider
apps/
  website/             # Vue consumer (loads React remotes)
```

## Packages

| Package | Description |
|---------|-------------|
| `@gold/design-system` | Gold tokens, portal setup, component utilities |
| `@gold/shared-components` | Styled UI components (MF remote, port **5100**) |

## Getting started

```bash
pnpm install
```

- React: http://localhost:4200
- Vue: http://localhost:4300
- Shared components: http://localhost:5100

```bash
pnpm stop        # free ports 4200, 4300, 5100
```

### Run individually

```bash
nx dev website
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
