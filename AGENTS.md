# Gold Workspace — AI Development Conventions

Persistent conventions for all AI-assisted development in this monorepo.

## Scope

| Area                                                   | Component folder pattern | Module folder pattern | Export conventions | Arrow functions | UI / hooks split | Lint / Prettier / `tsc` |
| ------------------------------------------------------ | ------------------------ | --------------------- | ------------------ | --------------- | ---------------- | ----------------------- |
| `packages/design-system`                               | ✅ Required              | —                     | ✅ Required        | ✅ Required     | ✅ Required      | ✅ Required             |
| `packages/form`                                        | ✅ Required              | —                     | ✅ Required        | ✅ Required     | ✅ Required      | ✅ Required             |
| `packages/shared-components`                           | ✅ Required              | —                     | ✅ Required        | ✅ Required     | ✅ Required      | ✅ Required             |
| `packages/apis`                                        | —                        | —                     | ✅ Required        | ✅ Required     | —                | ✅ Required             |
| TanStack apps (`apps/*` with `@tanstack/react-router`) | —                        | ✅ Required           | ✅ Required        | ✅ Required     | ✅ Required      | ✅ Required             |
| Other apps                                             | —                        | —                     | ✅ Required        | ✅ Required     | ✅ Required      | ✅ Required             |

---

## 1. Component Folder Structure

**Packages:** `design-system`, `form`, `shared-components`

Every component uses this folder layout — no exceptions when creating or refactoring components:

```
[component-name]/
  index.tsx                      # Component implementation
  [component-name].type.ts       # Props, variants, types
  [component-name].hook.ts       # Hooks and state logic
  [component-name].styles.ts     # Styles, class maps, tokens
```

### Naming

- Folder: kebab-case (`number-field`, `alert-dialog`)
- File prefix matches folder name (`number-field/number-field.hook.ts`)

### Example — `button/`

```
packages/shared-components/src/components/button/
  index.tsx
  button.type.ts
  button.hook.ts
  button.styles.ts
```

### `index.tsx` template

```tsx
import type { ButtonProps } from './button.type'
import { useButton } from './button.hook'
import { buttonStyles } from './button.styles'

const Button = (props: ButtonProps) => {
  const { className, children, ...rest } = useButton(props)
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  )
}

export default Button
export type { ButtonProps }
```

### Package barrel

```ts
import Button from './components/button'

export { Button }
```

---

## 2. Module Folder Structure

**TanStack Router apps only.** Each feature is one module under `src/modules/[feature-name]/`.

```
[feature-name]/
  apis/
  assets/images/  assets/pdf/  assets/json/
  components/[feature-name]-header.tsx
  stores/[feature-name].store.ts
  hooks/[feature-name].hook.ts
  types/index.ts
  utils/
  views/[route-name]-view/index.tsx
```

### Example — `auth/`

```
modules/auth/
  hooks/auth.hook.ts
  types/index.ts
  views/
    login-view/index.tsx
    otp-view/index.tsx
```

Routes in `src/routes/` stay thin — only `createFileRoute` wiring to a view.

Cross-feature shared code uses dedicated modules (e.g. `shell` for layout, `market` for shared data).

---

## 3. Export Conventions

**All packages and apps.** Exports only at the **bottom** of the file.

### ❌ Do not use inline exports

```ts
export const x = 1
export function fn() {}
export interface Props {}
export type Id = string
```

### ✅ Define first, export at bottom

```ts
const x = 1

const fn = () => {}

interface Props {}

type Id = string

export default fn
export { x }
export type { Props, Id }
```

### Allowed bottom export forms

| Form                   | Use for                                    |
| ---------------------- | ------------------------------------------ |
| `export default ...`   | Default export (components, main function) |
| `export { a, b }`      | Named value exports                        |
| `export type { A, B }` | Named type exports                         |

---

## 4. Arrow Functions Only

Never use the `function` keyword. Every callable starts with `const` and is an arrow function.

### ❌ Do not use function declarations or function expressions

```ts
function getToken() {
  return null
}

const load = function () {}

const api = {
  fetch() {
    return null
  },
}
```

### ✅ Always use const + arrow

```ts
const getToken = () => null

const load = async () => {}

const Button = (props: ButtonProps) => {
  return <button {...props} />
}

const useLogin = () => {}

const api = {
  fetch: () => null,
}
```

Applies to components, hooks, helpers, handlers, and object methods in all packages and apps.

---

## 5. UI in TSX, Logic in Hooks

`.tsx` files that are **not** hooks only render UI. All logic lives in `*.hook.ts`.

### Views / components may

- Call the feature hook
- Return JSX
- Map arrays the hook already prepared
- Pass hook handlers to events (`onClick={handleSubmit}`, `onClick={item.onSelect}`)
- Use static `t('key')` labels in JSX

### Views / components must not

- Use `useState`, `useEffect`, `useMemo`, or `useCallback`
- Derive values (`const total = price * qty`)
- Define handler bodies (`onClick={() => toast.success(...)}`)
- Transform data, pick translation keys by condition, or build option lists
- Pick class names or icons with ternaries (`side === 'buy' ? 'text-success' : 'text-danger'`)
- Call toast, navigate, APIs, or stores directly

```tsx
const TradeView = () => {
  const { total, handleSubmit, submitClassName } = useTrade()
  return (
    <button className={submitClassName} onClick={handleSubmit}>
      {total}
    </button>
  )
}
```

`t('nav.home')` for a static label is allowed. Conditional keys, class maps, and assembled lists belong in the hook.

Hook files stay `*.hook.ts`. Do not put JSX in hooks; use `createElement` when a hook must build React nodes.

---

## 6. Lint, Prettier, and TypeScript

Code is not done until it is formatted and type-safe.

```bash
pnpm exec prettier --write <files>
pnpm exec eslint --fix <files>
pnpm typecheck
```

| Check      | Command                             | Bar                                              |
| ---------- | ----------------------------------- | ------------------------------------------------ |
| Prettier   | `pnpm format` / `pnpm format:check` | `.prettierrc`                                    |
| ESLint     | `pnpm lint`                         | `eslint.config.mjs` — errors are blockers        |
| TypeScript | `pnpm typecheck`                    | `strict`, unused locals/params — no `tsc` errors |

Do not use `@ts-ignore`, `@ts-expect-error`, or `any` to hide errors. If Prettier and ESLint conflict, Prettier wins.

---

## 7. Migration Notes

Existing flat files have been migrated to the folder pattern in `shared-components` and `form`.

`design-system` is CSS-only today (tokens and Base UI styles). When React components are added, use the same folder pattern.

TanStack apps use the module folder pattern. Export conventions and arrow functions apply to all packages and apps.
