# Data Model: TypeScript-Only Migration

## Entities

### SourceInventoryItem

Represents one filesystem path classified during migration.

| Field | Type | Description |
|-------|------|-------------|
| path | string | Repo-relative path |
| classification | enum | `in_scope_js` \| `typed_replacement` \| `generated` \| `documented_exception` \| `removed` |
| extension | string | `.js` / `.mjs` / `.cjs` / `.ts` / `.tsx` / other |
| requiredBehavior | boolean | Whether the file provides required workspace behavior |
| replacementPath | string \| null | Typed path that replaces this item when converted |
| notes | string | Short free-text note |

**Validation**:
- Every path under `apps/`, `packages/`, `scripts/` that matches `*.{js,mjs,cjs}`
  and is not under a generated glob MUST be `in_scope_js`, then become
  `typed_replacement` or `removed` before done.
- Generated globs: `**/node_modules/**`, `**/dist/**`, `**/dev-dist/**`,
  `**/storybook-static/**`, `**/coverage/**`.
- Done condition: count of `in_scope_js` is 0.

### DocumentedException

| Field | Type | Description |
|-------|------|-------------|
| path | string | Repo-relative path or directory prefix |
| reason | string | Why conversion is deferred in this feature |
| owner | string | Team/role responsible for future change (optional) |

**Validation**:
- Must include at least: `eslint.config.mjs`, `commitlint.config.mjs`, and agent
  skill script trees that remain JS.
- Undocumented non-typed first-party configs/skills are not allowed (FR-009).

### QualityGateResult

| Field | Type | Description |
|-------|------|-------------|
| gate | enum | `format` \| `lint` \| `typecheck` \| `build` \| `test` \| `no_js_check` \| `smoke` |
| status | enum | `pass` \| `fail` |
| command | string | Exact command run |
| notes | string | Failure detail if any |

**Validation**: All required gates must be `pass` before feature done.

## Relationships

```text
SourceInventoryItem ──replacement──▶ SourceInventoryItem (typed)
DocumentedException ──covers──▶ paths outside conversion scope
QualityGateResult ──validates──▶ migrated tree + inventory completion
```

## State transitions (SourceInventoryItem)

```text
[discovered as in_scope_js]
        │
        ├──(has required behavior)──▶ typed_replacement
        │
        └──(no required behavior)───▶ removed

[discovered under generated glob]──▶ generated (terminal; no conversion)

[config / agent skill JS]──────────▶ documented_exception (terminal for this feature)
```

## Initial inventory snapshot (research-time)

| Path | Classification |
|------|----------------|
| `scripts/generate-base-ui-components.mjs` | `in_scope_js` → convert |
| `scripts/generate-storybook-stories.mjs` | `in_scope_js` → convert |
| `scripts/migrate-component-structure.mjs` | `in_scope_js` → convert or remove |
| `apps/**/dev-dist/**` | `generated` |
| `apps/storybook/storybook-static/**` | `generated` |
| `packages/**/dist/**` | `generated` |
| `eslint.config.mjs` | `documented_exception` |
| `commitlint.config.mjs` | `documented_exception` |
| `.agents/**/*.mjs`, `.opencode/**/*.mjs`, `.github/skills/**/*.mjs` | `documented_exception` |
