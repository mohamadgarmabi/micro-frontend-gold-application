#!/usr/bin/env bash
set -euo pipefail
# Quality entrypoint for local/CI runners (repo .github/ is gitignored).
pnpm check:no-js
pnpm typecheck
