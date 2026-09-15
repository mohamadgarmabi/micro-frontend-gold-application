# Research: TypeScript-Only Migration

## 1. In-scope inventory reality

**Decision**: Treat only maintainable source under `apps/`, `packages/`, and root
`scripts/` as conversion targets. Classify `**/dist/**`, `**/dev-dist/**`, and
`**/storybook-static/**` as generated output (exempt), not as migration debt.

**Rationale**: Current inventory shows zero maintainable `.js` under `packages/`
source. App trees only contain generated service-worker/PWA and Storybook static
bundles. Real debt is `scripts/*.mjs` (three files).

**Alternatives considered**:
- Counting all nested `.js` under apps as in-scope — rejected; contradicts
  generated-output exemption and would force deleting or rewriting build artifacts.
- Converting root configs in this feature — rejected by clarification Option C.

## 2. How to execute converted scripts

**Decision**: Convert `scripts/*.mjs` → `scripts/*.ts` and run via `tsx` (or
`pnpm exec tsx`) from `package.json` scripts. Prefer ESM-compatible TypeScript
(`import` / `import.meta.url`) matching current `.mjs` style.

**Rationale**: Scripts are Node CLIs with filesystem I/O; `tsx` avoids a separate
compile/emit step and matches common monorepo practice. Keeps `package.json`
entries simple (`tsx scripts/generate-base-ui-components.ts`).

**Alternatives considered**:
- `node --experimental-strip-types` — possible on newer Node, less portable across
  contributor environments.
- Compile scripts to `scripts/dist` with `tsc` — more moving parts for little gain.
- Keep `.mjs` and only type-check with JSDoc — fails FR-004 (zero in-scope JS).

## 3. Obsolete one-off scripts

**Decision**: For `scripts/migrate-component-structure.mjs`, prefer delete if the
one-time migration is already applied and unused; otherwise convert to `.ts`.
Confirm by searching package scripts and docs for references before delete.

**Rationale**: FR-003 requires removal of JS that provides no required behavior.
A finished structural migration script is debt if unused.

**Alternatives considered**: Convert everything blindly — more work, no user value.

## 4. Prevention gate implementation

**Decision**: Add an automated check that fails when any `.js` / `.cjs` / `.mjs`
exists under `apps/`, `packages/`, or `scripts/`, excluding known generated globs
(`dist`, `dev-dist`, `storybook-static`, `coverage`, `node_modules`). Prefer a
small dedicated script invoked from CI and optionally from `pnpm` (e.g.
`pnpm check:no-js`), optionally mirrored with an ESLint `no-restricted` / ignore
strategy if cheaper to wire into existing `pnpm lint`.

**Rationale**: Clarification requires policy + automated gate. A path inventory
script is simple, language-agnostic, and hard to accidentally bypass. ESLint alone
may not run on files that are never linted if someone adds a bare `.js`.

**Alternatives considered**:
- Policy-only — rejected by clarification B.
- ESLint-only on `**/*.{js,mjs,cjs}` with `files` error rule — good complement but
  weaker alone if lint ignores those paths.
- Husky pre-commit only — misses CI/PR path.

## 5. Exceptions register location

**Decision**: Keep the exceptions register as
`specs/001-typescript-only-migration/exceptions.md` (or feature docs path) listing
path + reason for `eslint.config.mjs`, `commitlint.config.mjs`, and agent skill
script trees (`.agents/`, `.opencode/`, `.github/skills`, `.cursor` skill scripts
if present).

**Rationale**: Lives with the feature artifacts; easy to review in the same PR;
satisfies FR-009 without inventing a new package.

**Alternatives considered**: Root `EXCEPTIONS.md` — fine later; feature-local is
enough for this delivery.

## 6. Typing strictness for scripts

**Decision**: Enable checking converted scripts via a dedicated `tsconfig` (e.g.
`scripts/tsconfig.json` with `strict`, `noUnusedLocals`, `noUnusedParameters`,
Node types) included in workspace typecheck or a `pnpm typecheck:scripts` step.

**Rationale**: Clarification A requires strict typecheck without silencers.
Root scripts are not covered by current `pnpm typecheck` (apps/packages only).

**Alternatives considered**: Rely on `tsx` runtime only — fails measurable SC-002.

## 7. Smoke verification scope

**Decision**: After migration, smoke primary flows for `application-pwa` and
`website` (and run `pnpm generate:components` / `generate:stories` once to prove
converted scripts). Storybook build optional if timeboxed but preferred if
generators touch stories.

**Rationale**: Spec User Story 3 names website and application-pwa; scripts must
still produce correct artifacts.

**Alternatives considered**: Full e2e suite — not required by spec; overkill.
