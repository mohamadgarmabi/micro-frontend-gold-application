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

function generateSingle(slug, exportName) {
  return `import { ${exportName} as Base${exportName} } from '@base-ui/react/${slug}';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../lib/cn';
import { singleComponentStyles } from '../lib/styles';

export type ${exportName}Props = ComponentProps<typeof Base${exportName}>;

export function ${exportName}({ className, ...props }: ${exportName}Props) {
  return (
    <Base${exportName}
      className={mergeClassName(singleComponentStyles.${exportName}, className)}
      {...props}
    />
  );
}

export default ${exportName};
`;
}

function generateNamespace(slug, exportName) {
  const overrides = MODULE_STYLE_OVERRIDES[exportName];
  const overrideEntries = overrides
    ? Object.entries(overrides)
        .map(([k, v]) => `  ${k}: ${styleRef(v)},`)
        .join('\n')
    : '';

  return `import { ${exportName} as Base${exportName} } from '@base-ui/react/${slug}';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const ${exportName} = createStyledModule(Base${exportName}, {
${overrideEntries}
});

export default ${exportName};
`;
}

fs.mkdirSync(componentsDir, { recursive: true });

const manifest = [];

for (const slug of UI_COMPONENTS) {
  const exportName = getExportName(slug);
  const fileName = slug;
  const filePath = path.join(componentsDir, `${fileName}.tsx`);

  const namespace = readNamespaceExport(slug);
  const isSingle = !namespace || SINGLE_EXPORT_OVERRIDES[slug];

  if (!MANUAL_COMPONENTS.has(slug)) {
    const content = isSingle
      ? generateSingle(slug, SINGLE_EXPORT_OVERRIDES[slug]?.exportName ?? exportName)
      : generateNamespace(slug, namespace ?? exportName);

    fs.writeFileSync(filePath, content);
  }

  manifest.push({ slug, name: exportName, file: `./src/components/${fileName}.tsx` });
}

const indexContent = `${manifest.map((m) => `export { default as ${m.name} } from './components/${m.slug}';`).join('\n')}
export { componentManifest } from './component-manifest';
`;

fs.writeFileSync(path.join(root, 'src/index.ts'), indexContent);

const manifestTs = `export const componentManifest = ${JSON.stringify(manifest, null, 2)} as const;

export type ComponentName = (typeof componentManifest)[number]['name'];
`;

fs.writeFileSync(path.join(root, 'src/component-manifest.ts'), manifestTs);

const exposes = Object.fromEntries(
  manifest.map((m) => [`./${m.name}`, m.file])
);

const viteExposes = `// Auto-generated by scripts/generate-base-ui-components.mjs
export const federationExposes = ${JSON.stringify(exposes, null, 2)} as const;
`;

fs.writeFileSync(path.join(root, 'federation-exposes.ts'), viteExposes);

console.log(`Generated ${manifest.length} Base UI components.`);
