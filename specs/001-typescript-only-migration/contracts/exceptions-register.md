# Contract: Exceptions Register

**Path**: `specs/001-typescript-only-migration/exceptions.md` (created during implementation)

## Purpose

Document first-party JavaScript that is intentionally not converted in this
feature (FR-009).

## Format

Markdown table:

| Path | Reason |
|------|--------|
| `eslint.config.mjs` | Workspace ESLint flat config; deferred per feature scope clarification |
| `commitlint.config.mjs` | Commitlint config; deferred per feature scope clarification |
| `.agents/**/*.mjs` (and peers under `.opencode/`, `.github/skills/`) | Agent skill scripts; not product runtime source |

## Rules

1. Every deferred non-typed first-party path outside generated output MUST appear.
2. In-scope paths (`apps/`, `packages/`, `scripts/` maintainable source) MUST NOT
   appear as exceptions to avoid hiding migration debt.
3. Generated output MUST NOT be listed as exceptions; it is classified separately.
