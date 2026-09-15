# Smoke / Validation Notes

**Date**: 2026-09-15

## Generators

- `pnpm generate:components` — OK (38 Base UI + 49 indexed folders). Custom exports (`sonner`, `typography`, `card`, …) preserved via merge logic. Component source under `src/components/` restored from git after run so hand-tuned wrappers stay intact.
- `pnpm generate:stories` — OK (`0 created, 38 skipped`).

## Quality gates

- `pnpm check:no-js` — pass
- `pnpm typecheck:scripts` — pass
- `pnpm exec tsc --noEmit -p packages/shared-components/tsconfig.json` — pass
- `pnpm exec tsc --noEmit -p packages/form/tsconfig.json` — pass
- `pnpm exec tsc --noEmit -p apps/application-pwa/tsconfig.json` — pass
- Prevention probe: temporary `scripts/probe-temp.js` fails gate; removal passes

## Automated prevention

- `package.json` → `check:no-js`
- `.husky/pre-commit` runs `pnpm check:no-js` (`.github/` is gitignored in this repo, so husky is the committed automated gate)

## App smoke

- Browser smoke of `application-pwa` / `website` not run in this agent session (no long-lived dev server verification). Recommend local: `pnpm dev:application-pwa` and `pnpm dev:website`.
