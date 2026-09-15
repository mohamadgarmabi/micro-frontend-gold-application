# Tasks: TypeScript-Only Migration

**Input**: Design documents from `/specs/001-typescript-only-migration/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not requested in the feature specification — no TDD/unit-test tasks included.
Validation uses inventory checks, workspace quality gates, generator runs, and smoke flows from `quickstart.md`.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Monorepo roots: `apps/`, `packages/`, `scripts/`
- Feature docs: `specs/001-typescript-only-migration/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Tooling and feature docs scaffolding for the migration

- [x] T001 Add `tsx` as a workspace `devDependency` in `package.json` and install with pnpm
- [x] T002 [P] Create strict `scripts/tsconfig.json` (`strict`, `noUnusedLocals`, `noUnusedParameters`, Node types, ESM) for converted scripts
- [x] T003 [P] Create `specs/001-typescript-only-migration/exceptions.md` from `specs/001-typescript-only-migration/contracts/exceptions-register.md` (include `eslint.config.mjs`, `commitlint.config.mjs`, and agent skill `.mjs` trees with reasons)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Complete inventory and shared wiring that all stories rely on

**⚠️ CRITICAL**: No user story conversion work should finish until inventory is baseline-documented

- [x] T004 Produce baseline inventory table in `specs/001-typescript-only-migration/inventory.md` listing every `*.{js,mjs,cjs}` under `apps/`, `packages/`, `scripts/` with classification enum values from `data-model.md` (`in_scope_js` | `typed_replacement` | `generated` | `documented_exception` | `removed`)
- [x] T005 Document generated exclude globs in `specs/001-typescript-only-migration/inventory.md` (`**/node_modules/**`, `**/dist/**`, `**/dev-dist/**`, `**/storybook-static/**`, `**/coverage/**`) and mark matching paths as `generated`
- [x] T006 Add `typecheck:scripts` script in `package.json` that runs `tsc --noEmit -p scripts/tsconfig.json` (may fail until conversions land; keep wired)

**Checkpoint**: Inventory + exceptions register + scripts tsconfig ready — conversion can begin

---

## Phase 3: User Story 1 - Maintainers work only in typed source (Priority: P1) 🎯 MVP

**Goal**: Zero maintainable JavaScript under `apps/`, `packages/`, and root `scripts/` (excluding generated globs); required behaviors live in `.ts` / `.tsx`

**Independent Test**: `find` (or later `pnpm check:no-js`) prints no in-scope JS; former script behaviors exist as typed files; `pnpm generate:components` / `pnpm generate:stories` entrypoints point at `.ts`

### Implementation for User Story 1

- [x] T007 [P] [US1] Convert `scripts/generate-base-ui-components.mjs` → `scripts/generate-base-ui-components.ts` (arrow functions, bottom exports, no `any` / `@ts-ignore` / `@ts-expect-error`)
- [x] T008 [P] [US1] Convert `scripts/generate-storybook-stories.mjs` → `scripts/generate-storybook-stories.ts` (arrow functions, bottom exports, no silencers)
- [x] T009 [US1] Decide convert-or-remove for `scripts/migrate-component-structure.mjs`: if unused (no `package.json` / docs references), delete it; otherwise convert to `scripts/migrate-component-structure.ts` with the same strict rules
- [x] T010 [US1] Update `package.json` scripts `generate:components` and `generate:stories` to run via `tsx` against the new `.ts` paths; update any other references to the old `.mjs` paths
- [x] T011 [US1] Delete converted/obsolete `.mjs` files under `scripts/` (`generate-base-ui-components.mjs`, `generate-storybook-stories.mjs`, and `migrate-component-structure.mjs` if removed/converted)
- [x] T012 [US1] Re-scan `apps/`, `packages/`, `scripts/` for remaining in-scope `*.{js,mjs,cjs}` (excluding generated globs); convert or remove any newly found maintainable files and update `specs/001-typescript-only-migration/inventory.md` so `in_scope_js` count is 0
- [x] T013 [US1] Update `specs/001-typescript-only-migration/inventory.md` rows to `typed_replacement` or `removed` for all former in-scope JS items

**Checkpoint**: In-scope maintainable JS count is 0; typed script replacements exist

---

## Phase 4: User Story 2 - Quality gates still prove the workspace is healthy (Priority: P1)

**Goal**: Format, lint, typecheck, tests, and builds pass on the migrated tree with zero migration-caused failures

**Independent Test**: Run the quality commands in `quickstart.md` section 3 successfully

### Implementation for User Story 2

- [x] T014 [US2] Make `pnpm typecheck:scripts` pass for all files under `scripts/*.ts` using `scripts/tsconfig.json` with no silencers
- [x] T015 [US2] Extend root `typecheck` in `package.json` to also run `typecheck:scripts` (or document equivalent combined gate) so scripts are covered by the standard check
- [x] T016 [US2] Run `pnpm exec prettier --write` on touched files under `scripts/` and `specs/001-typescript-only-migration/`, then ensure `pnpm format:check` passes for those paths
- [x] T017 [US2] Run `pnpm lint` and fix any migration-caused lint errors in touched files (keep constitution arrow-function / unused-import rules)
- [x] T018 [US2] Run `pnpm typecheck`, `pnpm test`, and `pnpm build`; fix migration-caused failures until all pass

**Checkpoint**: Workspace health gates green after migration

---

## Phase 5: User Story 3 - Product behavior is unchanged for end users (Priority: P2)

**Goal**: Generators and primary app flows still work; migration is invisible to end users

**Independent Test**: `pnpm generate:components` / `pnpm generate:stories` succeed; smoke `application-pwa` and `website` primary routes

### Implementation for User Story 3

- [x] T019 [US3] Run `pnpm generate:components` and confirm generators complete without error and do not recreate in-scope `.mjs` under `scripts/`
- [x] T020 [US3] Run `pnpm generate:stories` and confirm Storybook story generation completes without error
- [x] T021 [P] [US3] Smoke primary flows via `pnpm dev:application-pwa` (or preview) and record pass/fail notes in `specs/001-typescript-only-migration/smoke-notes.md`
- [x] T022 [P] [US3] Smoke primary flows via `pnpm dev:website` (or preview) and append pass/fail notes in `specs/001-typescript-only-migration/smoke-notes.md`

**Checkpoint**: Generators + primary apps show no migration regressions

---

## Phase 6: User Story 4 - New JavaScript source is prevented going forward (Priority: P3)

**Goal**: Written policy plus automated gate reject new in-scope `.js` / `.cjs` / `.mjs`

**Independent Test**: Probe file under `scripts/` makes `pnpm check:no-js` fail; removing it makes the check pass; governance docs state the rule

### Implementation for User Story 4

- [x] T023 [US4] Implement `scripts/check-no-js-source.ts` per `specs/001-typescript-only-migration/contracts/no-js-source-gate.md` (scan `apps/`, `packages/`, `scripts/`; exclude generated globs; exit non-zero listing offenders)
- [x] T024 [US4] Add `check:no-js` script to `package.json` that runs `tsx scripts/check-no-js-source.ts`
- [x] T025 [US4] Wire `pnpm check:no-js` into CI (existing GitHub Actions / Nx Cloud workflow under `.github/workflows/` or project CI config) so PRs fail on in-scope JS
- [x] T026 [US4] Update `AGENTS.md` (and `.cursor/rules/` only if needed for consistency) to state new in-scope JavaScript under `apps/`, `packages/`, `scripts/` is disallowed and enforced by `pnpm check:no-js`
- [x] T027 [US4] Verify gate: temporarily add `scripts/probe-temp.js`, confirm `pnpm check:no-js` fails, delete the probe, confirm it passes

**Checkpoint**: Policy + automated prevention gate verified

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final documentation alignment and end-to-end quickstart validation

- [x] T028 [P] Ensure `specs/001-typescript-only-migration/exceptions.md` matches final deferred paths and reasons
- [x] T029 [P] Sync any stale `.mjs` path mentions in `README.md` / `AGENTS.md` / package docs to `.ts` entrypoints
- [x] T030 Run full validation from `specs/001-typescript-only-migration/quickstart.md` (inventory zero-count, exceptions, quality gates, generators, smoke, prevention probe) and note results in `specs/001-typescript-only-migration/smoke-notes.md`
- [x] T031 Mark feature checklist readiness: confirm `specs/001-typescript-only-migration/checklists/requirements.md` still reflects the clarified/planned scope

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS story completion claims
- **User Story 1 (Phase 3)**: Depends on Foundational inventory baseline
- **User Story 2 (Phase 4)**: Depends on US1 conversions (typed scripts exist)
- **User Story 3 (Phase 5)**: Depends on US1 entrypoints + preferably US2 green typecheck for scripts
- **User Story 4 (Phase 6)**: Can start after Foundational; best after US1 zero-count so the gate starts green
- **Polish (Phase 7)**: Depends on US1–US4 desired scope complete

### User Story Dependencies

- **US1 (P1)**: After Phase 2 — primary MVP
- **US2 (P1)**: After US1 file conversions
- **US3 (P2)**: After US1 (generators) and ideally US2
- **US4 (P3)**: After Phase 2; verify after US1 so baseline is clean

### Parallel Opportunities

- T002 / T003 in Setup
- T007 / T008 script conversions in US1
- T021 / T022 smoke apps in US3
- T028 / T029 polish docs

---

## Parallel Example: User Story 1

```bash
# Convert independent scripts in parallel:
Task: "Convert scripts/generate-base-ui-components.mjs → scripts/generate-base-ui-components.ts"
Task: "Convert scripts/generate-storybook-stories.mjs → scripts/generate-storybook-stories.ts"

# Then serially:
Task: "Decide convert-or-remove for scripts/migrate-component-structure.mjs"
Task: "Update package.json generate:* entrypoints"
Task: "Delete obsolete scripts/*.mjs"
```

---

## Parallel Example: User Story 3

```bash
Task: "Smoke pnpm dev:application-pwa → specs/001-typescript-only-migration/smoke-notes.md"
Task: "Smoke pnpm dev:website → specs/001-typescript-only-migration/smoke-notes.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (`tsx`, `scripts/tsconfig.json`, exceptions register)
2. Complete Phase 2: Inventory baseline
3. Complete Phase 3: Convert/remove in-scope JS under `scripts/` (and any found under apps/packages)
4. **STOP and VALIDATE**: in-scope JS count is 0

### Incremental Delivery

1. Setup + Foundational → inventory ready
2. US1 → typed-only in-scope source (MVP)
3. US2 → quality gates green
4. US3 → generators + app smoke
5. US4 → automated no-JS gate + policy
6. Polish → quickstart fully green

### Parallel Team Strategy

1. One engineer: US1 conversions
2. After US1: another can draft US4 gate while US2 quality fixes run
3. US3 smokes after entrypoints work

---

## Notes

- [P] tasks = different files, no incomplete dependencies
- Story labels: [US1] typed source, [US2] quality gates, [US3] smoke, [US4] prevention
- Generated trees (`dev-dist`, `storybook-static`, `dist`) are never conversion targets
- Do not convert `eslint.config.mjs` / `commitlint.config.mjs` in this feature — list them in `exceptions.md`
- Suggested commit style when committing: `refactor(scripts): convert generators to TypeScript`
