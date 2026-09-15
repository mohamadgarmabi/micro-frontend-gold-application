# Quickstart: Validate TypeScript-Only Migration

## Prerequisites

- pnpm install completed
- Feature branch / worktree with migration changes applied
- Node.js available on PATH

## 1. Inventory zero-count (SC-001)

```bash
# Expect empty output (exit 0) after migration
pnpm check:no-js
```

If the script is not yet wired, equivalent manual check:

```bash
find apps packages scripts \( -name '*.js' -o -name '*.mjs' -o -name '*.cjs' \) \
  ! -path '*/node_modules/*' ! -path '*/dist/*' ! -path '*/dev-dist/*' \
  ! -path '*/storybook-static/*' ! -path '*/coverage/*'
```

**Expected**: no paths printed.

## 2. Exceptions register present (FR-009)

Open `specs/001-typescript-only-migration/exceptions.md` and confirm
`eslint.config.mjs`, `commitlint.config.mjs`, and agent skill script trees are
listed with reasons.

## 3. Quality gates (SC-003, SC-004)

```bash
pnpm format:check
pnpm lint
pnpm typecheck
# include scripts typecheck if added, e.g. pnpm typecheck:scripts
pnpm test
pnpm build
```

**Expected**: all succeed with zero migration-caused failures.

## 4. Converted generators still work

```bash
pnpm generate:components
pnpm generate:stories
```

**Expected**: scripts run via TypeScript entrypoints; outputs update without
errors; no new in-scope `.mjs` created under `scripts/`.

## 5. Smoke product flows (SC-005)

```bash
pnpm dev:application-pwa
# and/or
pnpm dev:website
```

**Expected**: primary existing routes load; no new blocking console/runtime
errors attributable to the migration.

## 6. Prevention gate (SC-006)

Temporarily add `scripts/probe-temp.js`, run `pnpm check:no-js` (or CI job),
confirm non-zero exit, then delete the probe file.

**Expected**: gate fails while probe exists; passes after removal.

## References

- [data-model.md](./data-model.md)
- [contracts/exceptions-register.md](./contracts/exceptions-register.md)
- [contracts/no-js-source-gate.md](./contracts/no-js-source-gate.md)
- [research.md](./research.md)
