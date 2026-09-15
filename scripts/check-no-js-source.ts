import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')

const inScopeRoots = ['apps', 'packages', 'scripts'] as const
const extensions = new Set(['.js', '.mjs', '.cjs'])
const excludeDirNames = new Set([
  'node_modules',
  'dist',
  'dev-dist',
  'storybook-static',
  'coverage',
  'out-tsc',
])

const shouldSkipDir = (dirName: string) => excludeDirNames.has(dirName)

const walk = (absoluteDir: string, relativeDir: string, offenders: string[]) => {
  let entries: fs.Dirent[]
  try {
    entries = fs.readdirSync(absoluteDir, { withFileTypes: true })
  } catch {
    return
  }

  for (const entry of entries) {
    const absolutePath = path.join(absoluteDir, entry.name)
    const relativePath = path.join(relativeDir, entry.name)

    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) continue
      walk(absolutePath, relativePath, offenders)
      continue
    }

    if (!entry.isFile()) continue
    const ext = path.extname(entry.name)
    if (!extensions.has(ext)) continue
    offenders.push(relativePath.split(path.sep).join('/'))
  }
}

const offenders: string[] = []

for (const root of inScopeRoots) {
  const absoluteRoot = path.join(repoRoot, root)
  if (!fs.existsSync(absoluteRoot)) continue
  walk(absoluteRoot, root, offenders)
}

if (offenders.length > 0) {
  console.error('In-scope JavaScript source is not allowed:')
  for (const filePath of offenders.sort()) {
    console.error(`  ${filePath}`)
  }
  process.exit(1)
}

console.log('OK: no in-scope JavaScript source under apps/, packages/, or scripts/.')
