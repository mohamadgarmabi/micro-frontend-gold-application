# Source Inventory — TypeScript-Only Migration

Generated during implementation. Classifications from `data-model.md`.

## Exclude globs (generated)

- `**/node_modules/**`
- `**/dist/**`
- `**/dev-dist/**`
- `**/storybook-static/**`
- `**/coverage/**`

## Inventory

| Path                                      | Classification         | Notes                               |
| ----------------------------------------- | ---------------------- | ----------------------------------- |
| `scripts/generate-base-ui-components.mjs` | `removed`              | Replaced by `.ts`                   |
| `scripts/generate-storybook-stories.mjs`  | `removed`              | Replaced by `.ts`                   |
| `scripts/migrate-component-structure.mjs` | `removed`              | Obsolete one-time migration; unused |
| `scripts/generate-base-ui-components.ts`  | `typed_replacement`    |                                     |
| `scripts/generate-storybook-stories.ts`   | `typed_replacement`    |                                     |
| `scripts/check-no-js-source.ts`           | `typed_replacement`    | Prevention gate                     |
| `apps/**/dev-dist/**`                     | `generated`            | PWA/workbox output                  |
| `apps/storybook/storybook-static/**`      | `generated`            | Storybook build output              |
| `packages/**/dist/**`                     | `generated`            | Package build output                |
| `eslint.config.mjs`                       | `documented_exception` | See exceptions.md                   |
| `commitlint.config.mjs`                   | `documented_exception` | See exceptions.md                   |
| `.agents/**/*.mjs`                        | `documented_exception` | See exceptions.md                   |
| `.opencode/**/*.mjs`                      | `documented_exception` | See exceptions.md                   |
| `.github/skills/**/*.mjs`                 | `documented_exception` | See exceptions.md                   |

## Done criteria

- Count of `in_scope_js` under `apps/`, `packages/`, `scripts/` (excluding generated globs): **0**
