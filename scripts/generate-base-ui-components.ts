type SingleOverride = { exportName: string; styleKey: string }
type StyleOverrideMap = Record<string, Record<string, string>>
type ManifestEntry = { slug: string; name: string; file: string }
type PackageExportValue = string | Record<string, string>
type PackageFile = {
  sideEffects?: boolean
  exports?: Record<string, PackageExportValue>
  [key: string]: unknown
}

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../packages/shared-components')
const componentsDir = path.join(root, 'src/components')
const baseUiRoot = path.resolve(__dirname, '../node_modules/@base-ui/react')

const UI_COMPONENTS = [
  'accordion',
  'alert-dialog',
  'autocomplete',
  'avatar',
  'button',
  'checkbox',
  'checkbox-group',
  'collapsible',
  'combobox',
  'context-menu',
  'dialog',
  'drawer',
  'field',
  'fieldset',
  'form',
  'input',
  'menu',
  'menubar',
  'meter',
  'navigation-menu',
  'number-field',
  'otp-field',
  'popover',
  'preview-card',
  'progress',
  'radio',
  'radio-group',
  'scroll-area',
  'select',
  'separator',
  'slider',
  'switch',
  'tabs',
  'toast',
  'toggle',
  'toggle-group',
  'toolbar',
  'tooltip',
]

const MANUAL_COMPONENTS = new Set(['button', 'input', 'drawer'])

const SINGLE_EXPORT_OVERRIDES: Record<string, SingleOverride> = {
  button: { exportName: 'Button', styleKey: 'Button' },
  input: { exportName: 'Input', styleKey: 'Input' },
  separator: { exportName: 'Separator', styleKey: 'Separator' },
  form: { exportName: 'Form', styleKey: 'Form' },
}

const MODULE_STYLE_OVERRIDES: StyleOverrideMap = {
  Avatar: { Root: 'avatarRoot', Image: 'avatarImage', Fallback: 'avatarFallback' },
  Checkbox: { Root: 'checkboxRoot', Indicator: 'checkboxIndicator' },
  Switch: { Root: 'switchRoot', Thumb: 'switchThumb' },
  Radio: { Root: 'radioRoot', Indicator: 'radioIndicator' },
  Slider: {
    Root: 'sliderRoot',
    Track: 'sliderTrack',
    Indicator: 'sliderIndicator',
    Thumb: 'sliderThumb',
  },
  Progress: { Root: 'progressRoot', Indicator: 'progressIndicator' },
  Meter: { Root: 'meterTrack', Indicator: 'meterIndicator', Track: 'meterTrack' },
  Tabs: { List: 'tabsList', Tab: 'tabsTrigger', Panel: 'tabsPanel' },
  Accordion: { Trigger: 'accordionTrigger', Panel: 'accordionPanel' },
  Collapsible: { Trigger: 'accordionTrigger', Panel: 'accordionPanel' },
  Menu: { Trigger: 'button.secondary', Popup: 'menuPopup', Item: 'menuItem' },
  Popover: { Trigger: 'button.secondary', Popup: 'popup' },
  Dialog: { Trigger: 'button.primary', Popup: 'popup', Backdrop: 'backdrop' },
  AlertDialog: { Trigger: 'button.destructive', Popup: 'popup', Backdrop: 'backdrop' },
  Tooltip: { Trigger: 'button.ghost', Popup: 'tooltipPopup' },
  Toast: { Viewport: 'toastViewport', Root: 'toastRoot' },
  ScrollArea: {
    Root: 'rounded-lg border border-border',
    Viewport: 'scrollViewport',
    Scrollbar: 'scrollScrollbar',
    Thumb: 'scrollThumb',
  },
  Select: { Trigger: 'selectTrigger', Popup: 'selectPopup', Item: 'selectItem' },
  Toolbar: { Root: 'toolbarRoot' },
  Toggle: { Root: 'toggle' },
  OTPField: { Input: 'otpInput' },
  Drawer: { Popup: 'drawerPopup', Backdrop: 'backdrop' },
  NavigationMenu: { List: 'navigationList', Trigger: 'navigationTrigger', Popup: 'popup' },
  PreviewCard: { Trigger: 'button.ghost', Popup: 'previewCardPopup' },
}

const styleRef = (path: string) => {
  if (path.includes(' ')) return `'${path}'`
  if (path.includes('.')) {
    const [a, b] = path.split('.')
    return `styles.${a}.${b}`
  }
  return `styles.${path}`
}

const pascalCase = (slug: string) => {
  return slug
    .split('-')
    .map((s: string) => s[0].toUpperCase() + s.slice(1))
    .join('')
}

const getExportName = (slug: string) => {
  const overrides: Record<string, string> = { 'otp-field': 'OTPField' }
  return overrides[slug] ?? pascalCase(slug)
}

const readNamespaceExport = (slug: string) => {
  const dts = fs.readFileSync(path.join(baseUiRoot, slug, 'index.d.mts'), 'utf8')
  const ns = dts.match(/export \* as (\w+)/)
  return ns?.[1] ?? null
}

const writeComponentFile = (slug: string, fileName: string, content: string) => {
  const dir = path.join(componentsDir, slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, fileName), content)
}

const hookFile = (exportName: string) => {
  return `const use${exportName} = () => {
  return {};
}

export { use${exportName} };
`
}

const stylesVarName = (slug: string) => {
  return `${slug.replace(/-/g, '')}Styles`
}

const classNameVarName = (slug: string) => {
  return `${slug.replace(/-/g, '')}ClassName`
}

const generateSingle = (slug: string, exportName: string) => {
  const classVar = classNameVarName(slug)

  writeComponentFile(
    slug,
    `${slug}.styles.ts`,
    `import { cva } from 'class-variance-authority';
import { singleComponentStyles } from '../../lib/styles';

const ${classVar} = cva(singleComponentStyles.${exportName} ?? '');

export { ${classVar} };
`,
  )

  writeComponentFile(
    slug,
    `${slug}.type.ts`,
    `import { ${exportName} as Base${exportName} } from '@base-ui/react/${slug}';
import type { ComponentProps } from 'react';

type ${exportName}Props = ComponentProps<typeof Base${exportName}>;

export type { ${exportName}Props };
`,
  )

  writeComponentFile(slug, `${slug}.hook.ts`, hookFile(exportName))

  writeComponentFile(
    slug,
    'index.tsx',
    `import { ${exportName} as Base${exportName} } from '@base-ui/react/${slug}';
import { mergeClassName } from '../../lib/cn';
import type { ${exportName}Props } from './${slug}.type';
import { ${classVar} } from './${slug}.styles';

const ${exportName} = ({ className, ...props }: ${exportName}Props) => {
  return (
    <Base${exportName}
      className={mergeClassName(${classVar}(), className)}
      {...props}
    />
  );
}

export default ${exportName};
export type { ${exportName}Props };
`,
  )
}

const generateNamespace = (slug: string, exportName: string) => {
  const overrides = MODULE_STYLE_OVERRIDES[exportName]
  const overrideEntries = overrides
    ? Object.entries(overrides)
        .map(([k, v]) => `  ${k}: cva(${styleRef(v)}),`)
        .join('\n')
    : ''

  const stylesVar = stylesVarName(slug)
  const stylesImport = overrideEntries
    ? `import { cva } from 'class-variance-authority';
import { styles } from '../../lib/styles';
`
    : `import { cva } from 'class-variance-authority';
`

  writeComponentFile(
    slug,
    `${slug}.styles.ts`,
    `${stylesImport}
const ${stylesVar} = {
${overrideEntries || "  Root: cva(''),"}
};

export { ${stylesVar} };
`,
  )

  writeComponentFile(
    slug,
    `${slug}.type.ts`,
    `type ${exportName}Module = Record<string, never>;

export type { ${exportName}Module };
`,
  )

  writeComponentFile(slug, `${slug}.hook.ts`, hookFile(exportName))

  writeComponentFile(
    slug,
    'index.tsx',
    `import { ${exportName} as Base${exportName} } from '@base-ui/react/${slug}';
import { createStyledModule } from '../../lib/create-styled-module';
import { ${stylesVar} } from './${slug}.styles';

const ${exportName} = createStyledModule(Base${exportName}, ${stylesVar});

export default ${exportName};
`,
  )
}

fs.mkdirSync(componentsDir, { recursive: true })

const baseUiManifest: ManifestEntry[] = []

for (const slug of UI_COMPONENTS) {
  const exportName = getExportName(slug)
  const namespace = readNamespaceExport(slug)
  const isSingle = !namespace || SINGLE_EXPORT_OVERRIDES[slug]

  if (!MANUAL_COMPONENTS.has(slug)) {
    if (isSingle) {
      generateSingle(slug, SINGLE_EXPORT_OVERRIDES[slug]?.exportName ?? exportName)
    } else {
      generateNamespace(slug, namespace ?? exportName)
    }
  }

  baseUiManifest.push({
    slug,
    name: exportName,
    file: `./src/components/${slug}/index.tsx`,
  })
}

const listComponentSlugs = (): string[] =>
  fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => fs.existsSync(path.join(componentsDir, slug, 'index.tsx')))
    .sort()

const buildIndexContent = (slugs: string[]) => {
  const importLines: string[] = []
  const exportNames: string[] = []

  for (const slug of slugs) {
    if (slug === 'sonner') {
      importLines.push(`import Toaster from './components/sonner'`)
      importLines.push(`import { toast } from './components/sonner'`)
      exportNames.push('Toaster', 'toast')
      continue
    }
    const name = getExportName(slug)
    importLines.push(`import ${name} from './components/${slug}'`)
    exportNames.push(name)
  }

  importLines.push(`import { cn, mergeClassName } from './lib/cn'`)
  exportNames.push('cn', 'mergeClassName')

  return `${importLines.join('\n')}

export {
  ${exportNames.join(',\n  ')},
}
export { componentManifest } from './component-manifest'
export type { PullRefreshLabels, PullRefreshProps } from './components/pull-refresh'
`
}

const allSlugs = listComponentSlugs()
fs.writeFileSync(path.join(root, 'src/index.ts'), buildIndexContent(allSlugs))

const manifestTs = `const componentManifest = ${JSON.stringify(baseUiManifest, null, 2)} as const;

type ComponentName = (typeof componentManifest)[number]['name'];

export { componentManifest };
export type { ComponentName };
`

fs.writeFileSync(path.join(root, 'src/component-manifest.ts'), manifestTs)

const pkgPath = path.join(root, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as PackageFile
const existingExports =
  pkg.exports && typeof pkg.exports === 'object' && !Array.isArray(pkg.exports)
    ? { ...(pkg.exports as Record<string, PackageExportValue>) }
    : {}

const exportsMap: Record<string, PackageExportValue> = {
  ...existingExports,
  '.': './src/index.ts',
  './cn': {
    types: './src/lib/cn.ts',
    import: './src/lib/cn.ts',
    module: './src/lib/cn.ts',
    browser: './src/lib/cn.ts',
    default: './src/lib/cn.ts',
  },
  './components/*': './src/components/*/index.tsx',
}

for (const slug of allSlugs) {
  exportsMap[`./${slug}`] = `./src/components/${slug}/index.tsx`
}

pkg.sideEffects = false
pkg.exports = exportsMap
fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)

const exposes = Object.fromEntries(
  allSlugs.map((slug) => {
    const name = slug === 'sonner' ? 'Toaster' : getExportName(slug)
    return [`./${name}`, `./src/components/${slug}/index.tsx`] as const
  }),
)

const viteExposes = `// Auto-generated by scripts/generate-base-ui-components.ts
const federationExposes = ${JSON.stringify(exposes, null, 2)} as const;

export { federationExposes };
`

fs.writeFileSync(path.join(root, 'federation-exposes.ts'), viteExposes)

console.log(
  `Generated ${baseUiManifest.length} Base UI components; indexed ${allSlugs.length} component folders.`,
)
