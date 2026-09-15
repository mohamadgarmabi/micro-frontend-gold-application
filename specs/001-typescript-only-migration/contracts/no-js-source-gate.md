# Contract: No In-Scope JavaScript Source Gate

## Purpose

Automated check required by FR-008 / SC-006: fail when maintainable JavaScript
source exists under in-scope roots.

## Inputs

- Workspace root
- In-scope roots: `apps/`, `packages/`, `scripts/`
- Exclude globs: `**/node_modules/**`, `**/dist/**`, `**/dev-dist/**`,
  `**/storybook-static/**`, `**/coverage/**`

## Behavior

1. Discover files matching `*.js`, `*.mjs`, `*.cjs` under in-scope roots.
2. Drop paths matching exclude globs.
3. If any remaining paths exist → exit non-zero and print the list.
4. If none remain → exit 0.

## Integration

- Runnable via a `package.json` script (recommended name: `check:no-js`).
- Invoked in CI on PRs (and locally before claiming done).
- May be complemented by ESLint, but this contract is the source of truth for
  inventory zero-count.

## Non-goals

- Does not typecheck converted files.
- Does not validate exceptions register contents.
- Does not scan root configs (`eslint.config.mjs`, etc.) — those are outside
  in-scope roots for this gate’s conversion target (root configs live at repo
  root, not under `scripts/` as product scripts). Note: `scripts/` is in-scope;
  root `*.mjs` configs are outside the three roots and covered by exceptions
  register instead.
