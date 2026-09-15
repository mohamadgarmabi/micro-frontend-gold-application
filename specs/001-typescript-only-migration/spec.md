# Feature Specification: TypeScript-Only Migration

**Feature Branch**: `001-typescript-only-migration`

**Created**: 2026-09-15

**Status**: Draft

**Input**: User description: "Migrate the Gold monorepo to a full TypeScript codebase: remove first-party .js/.cjs/.mjs source and convert to .ts/.tsx; exclude generated build output. Goal: full typed project with no remaining JavaScript source under in-scope paths."

## Clarifications

### Session 2026-09-15

- Q: Which files must be converted or removed in this migration for it to count as done? → A: Only `apps/`, `packages/`, and root `scripts/`. Workspace configs and agent skill scripts may remain as documented exceptions.
- Q: For this feature to be done, how must the team stop new JavaScript from being added under in-scope paths? → A: Policy plus automated check — lint/CI must fail on new in-scope JavaScript source.
- Q: After converting in-scope JavaScript to typed source, what typing quality is required for this feature to be done? → A: Strict — converted code must pass existing strict typecheck; no silenced typing for migration.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Maintainers work only in typed source (Priority: P1)

As a maintainer, I open any in-scope first-party source path and find only typed source files (`.ts` / `.tsx`). I do not encounter editable JavaScript source (`.js` / `.cjs` / `.mjs`) that the team is expected to maintain for product, packages, or project scripts.

**Why this priority**: This is the primary outcome requested—eliminate dual-language source and align with the project constitution.

**Independent Test**: Inventory all in-scope source paths; confirm zero maintainable JavaScript source files remain; confirm typed replacements exist where behavior previously lived in JavaScript.

**Acceptance Scenarios**:

1. **Given** the repository after migration, **When** a maintainer lists in-scope first-party source files under `apps/`, `packages/`, and root `scripts/`, **Then** every file is typed source (`.ts` / `.tsx`).
2. **Given** a former JavaScript module that provided behavior, **When** a maintainer locates that behavior after migration, **Then** it exists as typed source with equivalent responsibility (no silent deletion of required behavior).

---

### User Story 2 - Quality gates still prove the workspace is healthy (Priority: P1)

As a maintainer, after migration I can run the workspace’s existing format, lint, typecheck, and relevant build/test checks and they pass, confirming the migration did not leave a broken tree.

**Why this priority**: Migration without verifiable health is incomplete and blocks other work.

**Independent Test**: Run the standard workspace quality checks used by the team today; all required checks pass on the migrated tree.

**Acceptance Scenarios**:

1. **Given** a clean migrated workspace, **When** format, lint, and typecheck are run for affected projects, **Then** they complete successfully with no new errors introduced by the migration.
2. **Given** the same workspace, **When** the usual build (and tests where already configured) are run for affected packages/apps, **Then** they succeed.

---

### User Story 3 - Product behavior is unchanged for end users (Priority: P2)

As an end user of the website or application PWA, I continue to use the same flows after migration; screens, navigation, and interactions behave as before (migration is invisible to users).

**Why this priority**: Language migration must not regress product value.

**Independent Test**: Smoke-test primary routes/flows in the apps that share migrated packages; no functional regressions attributable to the migration.

**Acceptance Scenarios**:

1. **Given** a migrated build of the apps, **When** a user opens primary existing flows, **Then** those flows work as they did before the migration (same outcomes, no new blocking errors).

---

### User Story 4 - New JavaScript source is prevented going forward (Priority: P3)

As a maintainer, I am blocked from merging new in-scope JavaScript source by both written policy and an automated check (lint or CI) that fails when such files are introduced.

**Why this priority**: Prevents reintroducing the problem after cleanup.

**Independent Test**: Confirm governance forbids new in-scope JavaScript, and confirm an automated gate fails when a new in-scope `.js` / `.cjs` / `.mjs` source file is added under `apps/`, `packages/`, or root `scripts/`.

**Acceptance Scenarios**:

1. **Given** project governance after migration, **When** a contributor proposes a new in-scope JavaScript source file, **Then** the contribution is rejected by written policy.
2. **Given** the automated prevention check after migration, **When** a new in-scope JavaScript source file is introduced, **Then** lint or CI fails before merge.

---

### Edge Cases

- Generated build artifacts (for example under `dist/` or equivalent output folders) may still contain JavaScript; they are out of scope and must not be “migrated” as source.
- Workspace tooling config files (for example root lint/commit config) may remain as JavaScript for this feature and MUST appear in the documented exceptions register.
- Agent skill script trees may remain as JavaScript for this feature and MUST appear in the documented exceptions register (or an explicit out-of-scope inventory category).
- Empty or unused JavaScript files under in-scope paths must be removed rather than converted if they provide no required behavior.
- Partial migration of an in-scope package/app/script area is not acceptable for “done”: each in-scope area must reach zero remaining maintainable JavaScript source.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The workspace MUST provide a complete inventory of in-scope first-party JavaScript source files (`.js`, `.cjs`, `.mjs`) prior to declaring migration complete.
- **FR-002**: Every in-scope JavaScript source file that provides required behavior MUST be replaced by typed source (`.ts` / `.tsx`) that preserves that behavior and passes the workspace’s existing strict typecheck without using `any`, `@ts-ignore`, or `@ts-expect-error` to silence migration issues.
- **FR-003**: In-scope JavaScript source files that do not provide required behavior MUST be removed.
- **FR-004**: After migration, in-scope paths (`apps/`, `packages/`, root `scripts/`) MUST contain zero maintainable JavaScript source files.
- **FR-005**: Generated output directories MUST remain exempt from migration and MUST NOT be treated as source of truth.
- **FR-006**: Workspace quality gates used by the team (format, lint, typecheck, and relevant builds/tests) MUST pass on the migrated tree.
- **FR-007**: Existing end-user product behavior for primary app flows MUST remain unchanged by the migration.
- **FR-008**: Project governance MUST state that new in-scope JavaScript source is disallowed, consistent with the TypeScript-only constitution principle, AND an automated check (lint or CI) MUST fail when new in-scope `.js` / `.cjs` / `.mjs` source is added under `apps/`, `packages/`, or root `scripts/`.
- **FR-009**: Workspace tooling configs and agent skill scripts MAY remain as JavaScript for this feature and MUST be listed in the documented exceptions register (path + reason); they are not required to be converted to declare the feature done.
- **FR-010**: Package and app entrypoints, scripts, and imports that previously referenced in-scope JavaScript sources MUST be updated so the workspace resolves typed sources correctly after migration.

### Key Entities

- **Source inventory item**: A first-party file path classified as in-scope JavaScript source, typed replacement, generated output, or documented exception.
- **Documented exception**: A path allowed to remain non-typed, with owner-visible reason and review expectation.
- **Quality gate result**: Pass/fail outcome of format, lint, typecheck, build, and configured tests for affected projects.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Maintainable JavaScript source count under `apps/`, `packages/`, and root `scripts/` is **0**.
- **SC-002**: **100%** of inventoried required behaviors formerly in JavaScript have a typed replacement or an explicit removal justification, and converted code passes strict typecheck with **0** migration silencers (`any` / `@ts-ignore` / `@ts-expect-error` introduced for migration).
- **SC-003**: Format, lint, and typecheck for affected projects pass with **0** migration-caused failures.
- **SC-004**: Relevant builds (and existing tests for affected packages/apps) pass with **0** migration-caused failures.
- **SC-005**: Smoke verification of primary existing app flows shows **0** functional regressions attributable to the migration.
- **SC-006**: Governance clearly forbids new in-scope JavaScript source, and an automated lint/CI check fails when such a file is added under in-scope paths.

## Assumptions

- “In-scope” means first-party code under `apps/`, `packages/`, and root project `scripts/` only.
- Workspace tooling configs and agent skill scripts are out of conversion scope for this feature; they may remain JavaScript and must be recorded as documented exceptions.
- Generated folders such as `dist/`, coverage output, and similar build caches are out of scope.
- The constitution’s TypeScript-only principle (v1.0.0) remains the long-term policy; this feature’s done criteria intentionally narrow conversion scope to `apps/`, `packages/`, and root `scripts/`.
- Converted in-scope source must meet the workspace’s existing strict typing bar; migration silencers are not allowed.
- No new product features are included; this is a language/source consistency migration only.
- Existing Vue and React app surfaces remain; migration does not remove apps or change product scope.
