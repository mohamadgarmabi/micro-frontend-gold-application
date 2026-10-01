# Gold

Nx monorepo with **Tailwind CSS v4 design tokens**, **HeroUI** shared components, and the **application-pwa** React app.

## Structure

```
packages/
  design-system/       # Tailwind v4 tokens + global CSS
  shared-components/   # Shared UI components — Module Federation provider
  apis/                # Shared API layer (tanstack-fetch + react-query)
apps/
  application-pwa/     # React PWA
```

## Packages

| Package                   | Description                                     |
| ------------------------- | ----------------------------------------------- |
| `@gold/design-system`     | Gold tokens, portal setup, component utilities  |
| `@gold/shared-components` | Styled UI components (MF remote, port **5100**) |
| `@gold/apis`              | Typed API clients and query/mutation options    |

## Getting started

```bash
pnpm install
```

- PWA: http://localhost:4400 (or configured port)
- Shared components: http://localhost:5100

```bash
pnpm stop        # free ports 4200, 4400, 5100
```

### Run individually

```bash
nx dev application-pwa
nx dev shared-components
```

## Usage in apps

Import design system CSS:

```css
@import "@gold/design-system/styles.css";
```

Load federated components:

```tsx
import { lazyRemote } from "./mf"

const Button = lazyRemote("shared_components", "Button")
const Dialog = lazyRemote("shared_components", "Dialog")

// Compound components keep Base UI API:
// <Dialog><Dialog.Trigger>...</Dialog.Trigger></Dialog>
```

Wrap app root with `gold-root` class for correct popup stacking (Base UI requirement).

## Build

```bash
pnpm build
```
