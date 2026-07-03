import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../packages/shared-components');
const componentsDir = path.join(root, 'src/components');

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

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function hookPlaceholder(name) {
  return `function use${name}() {
  return {};
}

export { use${name} };
`;
}

function typePlaceholder(name) {
  return `type ${name}Module = Record<string, never>;

export type { ${name}Module };
`;
}

function migrateStyledModule(slug, exportName, content) {
  const baseImport = content.match(/import \{ (\w+) as Base\w+ \} from '(@base-ui\/react\/[^']+)';/) ??
    content.match(/import \{ (\w+) as Base\w+ \} from "(@base-ui\/react\/[^"]+)";/);

  const stylesMatch = content.match(
    /createStyledModule\(Base\w+,\s*\{([\s\S]*?)\}\s*\)/,
  );

  if (!baseImport || !stylesMatch) {
    throw new Error(`Could not parse styled module: ${slug}`);
  }

  const stylesBody = stylesMatch[1].trim();
  const stylesVar = `${slug.replace(/-/g, '')}Styles`;

  writeFile(
    path.join(componentsDir, slug, `${slug}.styles.ts`),
    `import { styles } from '../../lib/styles';

const ${stylesVar} = {
${stylesBody}
};

export { ${stylesVar} };
`,
  );

  writeFile(
    path.join(componentsDir, slug, `${slug}.type.ts`),
    typePlaceholder(exportName),
  );

  writeFile(
    path.join(componentsDir, slug, `${slug}.hook.ts`),
    hookPlaceholder(exportName),
  );

  writeFile(
    path.join(componentsDir, slug, 'index.tsx'),
    `import { ${exportName} as Base${exportName} } from '${baseImport[2]}';
import { createStyledModule } from '../../lib/create-styled-module';
import { ${stylesVar} } from './${slug}.styles';

const ${exportName} = createStyledModule(Base${exportName}, ${stylesVar});

export default ${exportName};
`,
  );
}

function migrateFunctionComponent(slug, exportName, content) {
  const typeMatch = content.match(
    /export type (\w+Props) = ([\s\S]*?);\n\nexport function/s,
  );

  const funcMatch = content.match(
    /export function (\w+)\([\s\S]*?\n\}\n\nexport default/s,
  );

  if (!funcMatch) {
    throw new Error(`Could not parse function component: ${slug}`);
  }

  const propsTypeName = typeMatch?.[1] ?? `${exportName}Props`;
  const propsTypeBody = typeMatch?.[2] ?? `ComponentProps<typeof Base${exportName}>`;

  const imports = content
    .split('\n')
    .filter((line) => line.startsWith('import '))
    .map((line) => line.replace(/\.\.\/lib\//g, '../../lib/'))
    .join('\n');

  const funcBody = funcMatch[0]
    .replace(/^export function /, 'function ')
    .replace(/\n\nexport default[\s\S]*$/, '');

  const hasCustomStyles =
    content.includes('singleComponentStyles') ||
    content.includes('styles.');

  let stylesContent;
  if (hasCustomStyles && slug === 'button') {
    stylesContent = `import { singleComponentStyles } from '../../lib/styles';

const buttonClassName = singleComponentStyles.Button;

export { buttonClassName };
`;
  } else if (hasCustomStyles && slug === 'input') {
    stylesContent = `import { singleComponentStyles, styles } from '../../lib/styles';

const inputStyles = {
  base: singleComponentStyles.Input,
  wrapper: styles.inputWrapper,
  withLeftIcon: styles.inputWithLeftIcon,
  withRightIcon: styles.inputWithRightIcon,
  error: styles.inputError,
  iconSlot: styles.inputIconSlot,
  iconLeft: styles.inputIconLeft,
  iconRight: styles.inputIconRight,
  errorText: styles.error,
};

export { inputStyles };
`;
  } else if (hasCustomStyles) {
    stylesContent = `import { singleComponentStyles } from '../../lib/styles';

const ${slug.replace(/-/g, '')}ClassName = singleComponentStyles.${exportName} ?? '';

export { ${slug.replace(/-/g, '')}ClassName };
`;
  } else {
    stylesContent = `const ${slug.replace(/-/g, '')}Styles = {} as const;

export { ${slug.replace(/-/g, '')}Styles };
`;
  }

  writeFile(path.join(componentsDir, slug, `${slug}.styles.ts`), stylesContent);

  const typeImports = typeMatch
    ? imports
    : `${imports}\nimport type { ComponentProps } from 'react';\nimport { ${exportName} as Base${exportName} } from '@base-ui/react/${slug}';`;

  writeFile(
    path.join(componentsDir, slug, `${slug}.type.ts`),
    `${typeImports.includes('ComponentProps') ? '' : "import type { ComponentProps } from 'react';\n"}import { ${exportName} as Base${exportName} } from '@base-ui/react/${slug}';

type ${propsTypeName} = ${propsTypeBody};

export type { ${propsTypeName} };
`,
  );

  writeFile(
    path.join(componentsDir, slug, `${slug}.hook.ts`),
    hookPlaceholder(exportName),
  );

  const indexImports = imports
    .split('\n')
    .filter((line) => !line.includes('ComponentProps'))
    .join('\n');

  writeFile(
    path.join(componentsDir, slug, 'index.tsx'),
    `${indexImports}
import type { ${propsTypeName} } from './${slug}.type';

${funcBody}

export default ${exportName};
${typeMatch ? `export type { ${propsTypeName} };` : ''}
`,
  );
}

function migrateButton(slug, content) {
  writeFile(
    path.join(componentsDir, slug, `${slug}.styles.ts`),
    `import { singleComponentStyles } from '../../lib/styles';

const buttonClassName = singleComponentStyles.Button;

export { buttonClassName };
`,
  );

  writeFile(
    path.join(componentsDir, slug, `${slug}.type.ts`),
    `import { Button as BaseButton } from '@base-ui/react/button';
import type { ComponentProps, ReactNode } from 'react';

type ButtonProps = ComponentProps<typeof BaseButton> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
};

export type { ButtonProps };
`,
  );

  writeFile(
    path.join(componentsDir, slug, `${slug}.hook.ts`),
    `import type { ButtonProps } from './button.type';

function useButton({ disabled, loading = false }: ButtonProps) {
  return {
    isDisabled: disabled || loading,
    loading,
  };
}

export { useButton };
`,
  );

  writeFile(
    path.join(componentsDir, slug, 'index.tsx'),
    `import { Button as BaseButton } from '@base-ui/react/button';
import { mergeClassName } from '../../lib/cn';
import { Spinner } from '../../lib/spinner';
import type { ButtonProps } from './button.type';
import { useButton } from './button.hook';
import { buttonClassName } from './button.styles';

function Button({
  className,
  leftIcon,
  rightIcon,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const { isDisabled } = useButton({ disabled, loading, leftIcon, rightIcon, children, ...props });

  return (
    <BaseButton
      className={mergeClassName(buttonClassName, className)}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <Spinner className="size-4 shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0 [&_svg]:size-4">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && (
        <span className="shrink-0 [&_svg]:size-4">{rightIcon}</span>
      )}
    </BaseButton>
  );
}

export default Button;
export type { ButtonProps };
`,
  );
}

function migrateInput(slug, content) {
  writeFile(
    path.join(componentsDir, slug, `${slug}.styles.ts`),
    `import { singleComponentStyles, styles } from '../../lib/styles';

const inputStyles = {
  base: singleComponentStyles.Input,
  wrapper: styles.inputWrapper,
  withLeftIcon: styles.inputWithLeftIcon,
  withRightIcon: styles.inputWithRightIcon,
  error: styles.inputError,
  iconSlot: styles.inputIconSlot,
  iconLeft: styles.inputIconLeft,
  iconRight: styles.inputIconRight,
  errorText: styles.error,
};

export { inputStyles };
`,
  );

  writeFile(
    path.join(componentsDir, slug, `${slug}.type.ts`),
    `import { Input as BaseInput } from '@base-ui/react/input';
import type { ComponentProps, ReactNode } from 'react';

type InputProps = ComponentProps<typeof BaseInput> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
  errorMessage?: string;
};

export type { InputProps };
`,
  );

  writeFile(
    path.join(componentsDir, slug, `${slug}.hook.ts`),
    `import type { InputProps } from './input.type';

function useInput({ id, name, error = false, errorMessage }: InputProps) {
  const inputId = id ?? name;

  return {
    inputId,
    errorDescribedBy:
      error && errorMessage && inputId ? \`\${inputId}-error\` : undefined,
  };
}

export { useInput };
`,
  );

  writeFile(
    path.join(componentsDir, slug, 'index.tsx'),
    `import { Input as BaseInput } from '@base-ui/react/input';
import { cn, mergeClassName } from '../../lib/cn';
import type { InputProps } from './input.type';
import { useInput } from './input.hook';
import { inputStyles } from './input.styles';

function Input({
  className,
  leftIcon,
  rightIcon,
  error = false,
  errorMessage,
  id,
  ...props
}: InputProps) {
  const { inputId, errorDescribedBy } = useInput({
    id,
    name: props.name,
    error,
    errorMessage,
    leftIcon,
    rightIcon,
    className,
    ...props,
  });

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className={inputStyles.wrapper}>
        {leftIcon && (
          <span
            className={cn(inputStyles.iconSlot, inputStyles.iconLeft)}
            aria-hidden
          >
            <span className="[&_svg]:size-4">{leftIcon}</span>
          </span>
        )}

        <BaseInput
          id={inputId}
          className={mergeClassName(
            cn(
              inputStyles.base,
              leftIcon ? inputStyles.withLeftIcon : undefined,
              rightIcon ? inputStyles.withRightIcon : undefined,
              error ? inputStyles.error : undefined,
            ),
            className,
          )}
          aria-invalid={error || undefined}
          aria-describedby={errorDescribedBy}
          {...props}
        />

        {rightIcon && (
          <span
            className={cn(inputStyles.iconSlot, inputStyles.iconRight)}
            aria-hidden
          >
            <span className="[&_svg]:size-4">{rightIcon}</span>
          </span>
        )}
      </div>

      {error && errorMessage && (
        <p id={inputId ? \`\${inputId}-error\` : undefined} className={inputStyles.errorText}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default Input;
export type { InputProps };
`,
  );
}

const files = fs
  .readdirSync(componentsDir)
  .filter((f) => f.endsWith('.tsx'));

for (const file of files) {
  const slug = file.replace(/\.tsx$/, '');
  const exportName = getExportName(slug);
  const content = fs.readFileSync(path.join(componentsDir, file), 'utf8');
  const dir = path.join(componentsDir, slug);

  if (slug === 'button') {
    migrateButton(slug, content);
  } else if (slug === 'input') {
    migrateInput(slug, content);
  } else if (content.includes('createStyledModule')) {
    migrateStyledModule(slug, exportName, content);
  } else if (content.includes('export function')) {
    migrateFunctionComponent(slug, exportName, content);
  } else {
    throw new Error(`Unknown component pattern: ${slug}`);
  }

  fs.unlinkSync(path.join(componentsDir, file));
  console.log(`Migrated ${slug}`);
}

const manifest = files.map((file) => {
  const slug = file.replace(/\.tsx$/, '');
  return {
    slug,
    name: getExportName(slug),
    file: `./src/components/${slug}/index.tsx`,
  };
});

writeFile(
  path.join(root, 'src/index.ts'),
  `${manifest.map((m) => `import ${m.name} from './components/${m.slug}';`).join('\n')}

export {
  ${manifest.map((m) => m.name).join(',\n  ')},
};
export { componentManifest } from './component-manifest';
`,
);

writeFile(
  path.join(root, 'src/component-manifest.ts'),
  `const componentManifest = ${JSON.stringify(manifest, null, 2)} as const;

type ComponentName = (typeof componentManifest)[number]['name'];

export { componentManifest };
export type { ComponentName };
`,
);

const exposes = Object.fromEntries(
  manifest.map((m) => [`./${m.name}`, m.file]),
);

writeFile(
  path.join(root, 'federation-exposes.ts'),
  `// Auto-generated by scripts/generate-base-ui-components.mjs
const federationExposes = ${JSON.stringify(exposes, null, 2)} as const;

export { federationExposes };
`,
);

const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const exports = {
  '.': './src/index.ts',
  './components/*': './src/components/*/index.tsx',
};

for (const m of manifest) {
  exports[`./${m.slug}`] = `./src/components/${m.slug}/index.tsx`;
}

pkg.exports = exports;
fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

console.log(`Done. Migrated ${manifest.length} components.`);
