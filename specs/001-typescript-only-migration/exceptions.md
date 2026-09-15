# Documented Exceptions (TypeScript-Only Migration)

Paths intentionally left as JavaScript for this feature. See
`contracts/exceptions-register.md`.

| Path                                              | Reason                                                            |
| ------------------------------------------------- | ----------------------------------------------------------------- |
| `eslint.config.mjs`                               | Workspace ESLint flat config; deferred per clarification Option C |
| `commitlint.config.mjs`                           | Commitlint config; deferred per clarification Option C            |
| `.agents/**/*.mjs`                                | Agent skill scripts; not product runtime source                   |
| `.opencode/**/*.mjs`                              | Agent skill scripts; not product runtime source                   |
| `.github/skills/**/*.mjs`                         | Agent skill scripts; not product runtime source                   |
| `.cursor/**` skill helper scripts (if any `.mjs`) | Agent tooling; not product runtime source                         |
