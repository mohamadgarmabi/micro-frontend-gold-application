<!--
Sync Impact Report
- Version change: (none) → 1.0.0
- Modified principles: N/A (initial ratification from template placeholders)
- Added sections:
  - Core Principles (I–V)
  - Technology Constraints
  - Development Workflow
  - Governance
- Removed sections: N/A
- Follow-up TODOs:
  - Migrate remaining source/config `.js` / `.mjs` / `.cjs` to TypeScript (deferred implementation intent)
-->

# Gold Workspace Constitution

## Core Principles

### I. TypeScript-Only Source (NON-NEGOTIABLE)

All application and package source MUST be TypeScript (`.ts` / `.tsx`). New `.js`,
`.cjs`, or `.mjs` source files MUST NOT be added under `apps/`, `packages/`, or
project `scripts/` when a TypeScript equivalent is supported. Existing JavaScript
source MUST be migrated to TypeScript rather than extended in place. Generated
build artifacts under `dist/` (and equivalent output folders) are exempt.
Tooling config files MUST migrate to TypeScript when the tool supports it;
otherwise document the exception in the change description.

**Rationale**: One language surface reduces drift, enables strict typing, and
keeps lint/`tsc` as reliable quality gates across the monorepo.

### II. UI in Views, Logic in Hooks

`.tsx` files that are not hooks MUST only render. Business logic, state, effects,
derived values, handlers, and view-model mapping MUST live in `*.hook.ts`. Views
MAY call one feature hook, return JSX, map prepared lists, and bind prepared
handlers. Views MUST NOT use `useState` / `useEffect`, define handler bodies,
derive values, or pick classes/icons/translation keys with ternaries.

**Rationale**: Keeps screens readable and testable; concentrates behavior where
reviewers expect it.

### III. Arrow Functions and Bottom Exports

Callables MUST be declared as `const name = () => {}` (or `async () => {}`).
The `function` keyword MUST NOT be used for declarations or object methods.
Exports MUST appear only at the bottom of the file (`export default`,
`export { ... }`, `export type { ... }`) — never inline on the declaration.

**Rationale**: Uniform module shape improves consistency for humans and AI
agents across packages and apps.

### IV. Structured Folders by Package Type

Package components (`design-system`, `form`, `shared-components`) MUST use the
kebab-case component folder layout (`index.tsx`, `*.type.ts`, `*.hook.ts`,
`*.styles.ts`). TanStack Router apps MUST place features under
`src/modules/[feature]/` with `views/`, `hooks/`, `apis/`, `types/`, and thin
`src/routes/` wiring only. Shared cross-feature code MUST use dedicated modules,
not ad-hoc `src/components/` dumps.

**Rationale**: Predictable locations reduce search cost and prevent structural
entropy as the monorepo grows.

### V. Simplicity and Type Safety Gates

Prefer the simplest correct solution. Do not introduce abstractions without
clear reuse. `any`, `@ts-ignore`, and `@ts-expect-error` MUST NOT silence type
errors. Changes MUST pass Prettier, ESLint, and `tsc` (`strict`, unused locals
and parameters). Do not use `useMemo` or `useCallback` — React Compiler
memoizes automatically.

**Rationale**: Strict typing and small diffs keep the codebase maintainable;
premature optimization and silenced errors create long-term debt.

## Technology Constraints

- Stack: Nx monorepo, React (and existing Vue consumers where present), Tailwind
  CSS v4 design tokens, Base UI-backed shared components, Vitest where configured.
- Language: TypeScript for all first-party source; see Principle I.
- Quality tooling: workspace Prettier, ESLint (`eslint.config`), and project
  `tsconfig` settings are mandatory gates before merge.
- Commit subjects MUST follow `type(scope): description` (scope required).
- Runtime development guidance for agents lives in `AGENTS.md` and
  `.cursor/rules/`; those docs MUST remain consistent with this constitution.
  On conflict, this constitution wins until amended.

## Development Workflow

1. Prefer Spec Kit flow for net-new features: specify → clarify (if needed) →
   plan → tasks → analyze (optional) → implement.
2. Before finishing work: format touched files, fix lint, run typecheck on
   affected projects.
3. For UI changes: verify behavior in the browser (not appearance alone) across
   affected routes and empty/error variants when relevant.
4. Do not commit secrets. Do not commit unless explicitly requested.
5. PRs and reviews MUST check constitution compliance (TypeScript-only source,
   hooks/UI split, exports, folder layout, quality gates).

## Governance

This constitution supersedes conflicting informal practices. Amendments MUST
update `.specify/memory/constitution.md`, bump **Version** semantically
(MAJOR for incompatible principle removals/redefinitions, MINOR for new or
materially expanded principles, PATCH for clarifications), set **Last Amended**
to the amendment date, and include a Sync Impact Report comment for human
review before commit. Compliance is reviewed on every PR that touches source or
governance docs. Complexity beyond these rules MUST be justified in the PR
description. Use `AGENTS.md` for day-to-day implementation patterns that
implement these principles.

**Version**: 1.0.0 | **Ratified**: 2026-09-15 | **Last Amended**: 2026-09-15
