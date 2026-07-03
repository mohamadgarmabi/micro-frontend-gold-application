import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../packages/shared-components');
const componentsDir = path.join(root, 'src/components');
const baseUiRoot = path.resolve(__dirname, '../node_modules/@base-ui/react');

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
];

const MANUAL_COMPONENTS = new Set(['button', 'input']);

const SINGLE_EXPORT_OVERRIDES = {
  button: { exportName: 'Button', styleKey: 'Button' },
  input: { exportName: 'Input', styleKey: 'Input' },
  separator: { exportName: 'Separator', styleKey: 'Separator' },
  form: { exportName: 'Form', styleKey: 'Form' },
};

const MODULE_STYLE_OVERRIDES = {
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
};

function styleRef(path) {
  if (path.includes(' ')) return `'${path}'`;
  if (path.includes('.')) {
    const [a, b] = path.split('.');
    return `styles.${a}.${b}`;
  }
  return `styles.${path}`;
}

function pascalCase(slug) {
  return slug
    .split('-')
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join('');
}

function getExportName(slug) {
  const overrides = { 'otp-field': 'OTPField' };
  return overrides[slug] ?? pascalCase(slug);
}

function readNamespaceExport(slug) {
  const dts = fs.readFileSync(path.join(baseUiRoot, slug, 'index.d.mts'), 'utf8');
  const ns = dts.match(/export \* as (\w+)/);
  return ns?.[1] ?? null;
}

function writeComponentFile(slug, fileName, content) {
  const dir = path.join(componentsDir, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, fileName), content);
}

function hookFile(exportName) {
  return `function use${exportName}() {
  return {};
}

export { use${exportName} };
`;
}

function typeFile(exportName, propsTypeBody) {
  return `import { ${exportName} as Base${exportName} } from '@base-ui/react/${exportName === 'OTPField' ? 'otp-field' : exportName.replace(/([A-Z])/g, (m, c, i) => (i ? '-' : '') + c.toLowerCase()).replace(/^-/, '')}';
import type { ComponentProps } from 'react';

type ${exportName}Props = ${propsTypeBody};

export type { ${exportName}Props };
`;
}

function stylesVarName(slug) {
  return `${slug.replace(/-/g, '')}Styles`;
}

function classNameVarName(slug) {
  return `${slug.replace(/-/g, '')}ClassName`;
}

function generateSingle(slug, exportName) {
  const classVar = classNameVarName(slug);

  writeComponentFile(
    slug,
    `${slug}.styles.ts`,
    `import { singleComponentStyles } from '../../lib/styles';

const ${classVar} = singleComponentStyles.${exportName} ?? '';

export { ${classVar} };
`,
  );

  writeComponentFile(
    slug,
    `${slug}.type.ts`,
    `import { ${exportName} as Base${exportName} } from '@base-ui/react/${slug}';
import type { ComponentProps } from 'react';

type ${exportName}Props = ComponentProps<typeof Base${exportName}>;

export type { ${exportName}Props };
`,
  );

  writeComponentFile(slug, `${slug}.hook.ts`, hookFile(exportName));

  writeComponentFile(
    slug,
    'index.tsx',
    `import { ${exportName} as Base${exportName} } from '@base-ui/react/${slug}';
import { mergeClassName } from '../../lib/cn';
import type { ${exportName}Props } from './${slug}.type';
import { ${classVar} } from './${slug}.styles';

function ${exportName}({ className, ...props }: ${exportName}Props) {
  return (
    <Base${exportName}
      className={mergeClassName(${classVar}, className)}
      {...props}
    />
  );
}

export default ${exportName};
export type { ${exportName}Props };
`,
  );
}

function generateNamespace(slug, exportName) {
  const overrides = MODULE_STYLE_OVERRIDES[exportName];
  const overrideEntries = overrides
    ? Object.entries(overrides)
        .map(([k, v]) => `  ${k}: ${styleRef(v)},`)
        .join('\n')
    : '';

  const stylesVar = stylesVarName(slug);

  writeComponentFile(
    slug,
    `${slug}.styles.ts`,
    `import { styles } from '../../lib/styles';

const ${stylesVar} = {
${overrideEntries}
};

export { ${stylesVar} };
`,
  );

  writeComponentFile(
    slug,
    `${slug}.type.ts`,
    `type ${exportName}Module = Record<string, never>;

export type { ${exportName}Module };
`,
  );

  writeComponentFile(slug, `${slug}.hook.ts`, hookFile(exportName));

  writeComponentFile(
    slug,
    'index.tsx',
    `import { ${exportName} as Base${exportName} } from '@base-ui/react/${slug}';
import { createStyledModule } from '../../lib/create-styled-module';
import { ${stylesVar} } from './${slug}.styles';

const ${exportName} = createStyledModule(Base${exportName}, ${stylesVar});

export default ${exportName};
`,
  );
}

fs.mkdirSync(componentsDir, { recursive: true });

const manifest = [];

for (const slug of UI_COMPONENTS) {
  const exportName = getExportName(slug);
  const namespace = readNamespaceExport(slug);
  const isSingle = !namespace || SINGLE_EXPORT_OVERRIDES[slug];

  if (!MANUAL_COMPONENTS.has(slug)) {
    if (isSingle) {
      generateSingle(slug, SINGLE_EXPORT_OVERRIDES[slug]?.exportName ?? exportName);
    } else {
      generateNamespace(slug, namespace ?? exportName);
    }
  }

  manifest.push({ slug, name: exportName, file: `./src/components/${slug}/index.tsx` });
}

const indexContent = `${manifest.map((m) => `import ${m.name} from './components/${m.slug}';`).join('\n')}

export {
  ${manifest.map((m) => m.name).join(',\n  ')},
};
export { componentManifest } from './component-manifest';
`;

fs.writeFileSync(path.join(root, 'src/index.ts'), indexContent);

const manifestTs = `const componentManifest = ${JSON.stringify(manifest, null, 2)} as const;

type ComponentName = (typeof componentManifest)[number]['name'];

export { componentManifest };
export type { ComponentName };
`;

fs.writeFileSync(path.join(root, 'src/component-manifest.ts'), manifestTs);

const exposes = Object.fromEntries(
  manifest.map((m) => [`./${m.name}`, m.file])
);

const viteExposes = `// Auto-generated by scripts/generate-base-ui-components.mjs
const federationExposes = ${JSON.stringify(exposes, null, 2)} as const;

export { federationExposes };
`;

fs.writeFileSync(path.join(root, 'federation-exposes.ts'), viteExposes);

const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const exports = {
  '.': './src/index.ts',
  './components/*': './src/components/*/index.tsx',
};

for (const m of manifest) {
  exports[`./${m.slug}`] = `./src/components/${m.slug}/index.tsx`;
}

pkg.sideEffects = false;
pkg.exports = exports;
fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

console.log(`Generated ${manifest.length} Base UI components.`);
