# Implementation Plan: TypeScript-Only Migration

**Branch**: `001-typescript-only-migration` | **Date**: 2026-09-15 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-typescript-only-migration/spec.md`

## Summary

Migrate first-party maintainable JavaScript under `apps/`, `packages/`, and root
`scripts/` to strict TypeScript (`.ts` / `.tsx`), remove obsolete JS, document
out-of-scope exceptions (workspace configs + agent skill scripts), treat generated
output (`dist/`, `dev-dist/`, `storybook-static/`) as exempt, and add an automated
lint/CI gate that fails when new in-scope JS appears. Primary conversion work today
is three root `scripts/*.mjs` generators; app/package source is already typed aside
from generated trees.

## Technical Context

**Language/Version**: TypeScript 5.x (workspace `tsc` / existing project tsconfigs),
Node.js 22+ for running converted scripts

**Primary Dependencies**: Existing Nx + pnpm workspace; add `tsx` (or equivalent)
only if needed to execute converted `scripts/*.ts` without a separate compile step

**Storage**: N/A (filesystem source inventory + exceptions register markdown)

**Testing**: Existing Vitest via `pnpm test`; inventory verification via shell
find/rg; smoke via app preview/dev for website and application-pwa

**Target Platform**: Local developer workstation + CI (Nx Cloud / GitHub Actions
as already used)

**Project Type**: Nx monorepo migration (apps + packages + root scripts)

**Performance Goals**: N/A — migration correctness over runtime perf

**Constraints**: Strict typecheck with no `any` / `@ts-ignore` / `@ts-expect-error`
for migration; constitution arrow-functions + bottom-exports; do not convert
`eslint.config.mjs` / `commitlint.config.mjs` / agent skill scripts in this feature

**Scale/Scope**: ~3 maintainable in-scope `.mjs` scripts (~1.4k LOC); generated JS
trees under `apps/**/dev-dist` and `apps/storybook/storybook-static` exempt;
packages source already TypeScript

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| I. TypeScript-Only Source | PASS (design) | Plan converts in-scope JS; documents config/skill exceptions per clarified scope |
| II. UI in Views, Logic in Hooks | PASS | No UI feature work; generators must not emit non-compliant component logic |
| III. Arrow Functions and Bottom Exports | PASS | Converted scripts/modules must follow these rules |
| IV. Structured Folders | PASS | No new package layout; keep existing module/component patterns |
| V. Simplicity and Type Safety Gates | PASS | No silencers; pass prettier/eslint/tsc |
| Quality gates before merge | PASS | plan requires format, lint, typecheck, build/test as applicable |
| Commit message format | PASS | Implementation commits use `type(scope): description` |

**Post-design re-check**: PASS — artifacts stay documentation + script conversion;
prevention gate is a small ESLint/CI check (simplest enforceable approach).

## Project Structure

### Documentation (this feature)

```text
specs/001-typescript-only-migration/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── exceptions-register.md
│   └── no-js-source-gate.md
└── tasks.md             # created by /speckit-tasks (not this command)
```

### Source Code (repository root)

```text
scripts/
  generate-base-ui-components.ts   # convert from .mjs
  generate-storybook-stories.ts    # convert from .mjs
  migrate-component-structure.ts   # convert or delete if obsolete
  # exceptions register may live at specs/.../exceptions.md or docs/

apps/
  application-pwa/                 # already TS source; ignore/dev-dist generated
  website/
  storybook/                       # ignore storybook-static generated
  backend/

packages/
  apis/
  design-system/
  form/
  shared-components/

eslint.config.mjs                  # documented exception (not converted)
commitlint.config.mjs              # documented exception (not converted)
package.json                       # update script entrypoints to .ts runners
```

**Structure Decision**: Keep the existing Nx monorepo layout. Migration changes
files in place under `scripts/` (and any unexpected in-scope JS found during
inventory), plus workspace gate config. No new apps or packages.

## Complexity Tracking

> No constitution violations requiring justification.
