import nx from '@nx/eslint-plugin'
import prettier from 'eslint-config-prettier'

const viewLogicSelectors = [
  {
    selector: "CallExpression[callee.name='useState']",
    message: 'Move useState into a *.hook.ts file',
  },
  {
    selector: "CallExpression[callee.name='useEffect']",
    message: 'Move useEffect into a *.hook.ts file',
  },
  {
    selector: "CallExpression[callee.name='useRef']",
    message: 'Move useRef into a *.hook.ts file',
  },
  {
    selector: "CallExpression[callee.name='useLayoutEffect']",
    message: 'Move useLayoutEffect into a *.hook.ts file',
  },
]

const arrowFunctionSelectors = [
  {
    selector: 'FunctionDeclaration',
    message: 'Use const name = () => {}. Function declarations are not allowed.',
  },
  {
    selector: 'FunctionExpression',
    message: 'Use an arrow function. function () {} is not allowed.',
  },
  {
    selector: 'Property[method=true]',
    message: 'Use { key: () => {} }. Object methods are not allowed.',
  },
]

const reactCompilerSelectors = [
  {
    selector: "CallExpression[callee.name='useMemo']",
    message: 'React Compiler memoizes automatically. Do not use useMemo.',
  },
  {
    selector: "CallExpression[callee.name='useCallback']",
    message: 'React Compiler memoizes automatically. Do not use useCallback.',
  },
  {
    selector: "CallExpression[callee.property.name='useMemo']",
    message: 'React Compiler memoizes automatically. Do not use useMemo.',
  },
  {
    selector: "CallExpression[callee.property.name='useCallback']",
    message: 'React Compiler memoizes automatically. Do not use useCallback.',
  },
]

const unusedVarsRule = [
  'error',
  {
    args: 'after-used',
    argsIgnorePattern: '^_',
    caughtErrors: 'all',
    caughtErrorsIgnorePattern: '^_',
    ignoreRestSiblings: true,
    vars: 'all',
    varsIgnorePattern: '^_',
  },
]

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/out-tsc',
      '**/vitest.config.*.timestamp*',
      '**/dev-dist/**',
      '**/sw.js',
      '**/workbox-*.js',
      '**/routeTree.gen.ts',
      '**/storybook-static/**',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': unusedVarsRule,
    },
  },
  {
    files: ['apps/**/*.{ts,tsx,js,jsx}', 'packages/**/*.{ts,tsx,js,jsx}'],
    ignores: ['**/*.d.ts', '**/scripts/**'],
    rules: {
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'prefer-arrow-callback': 'error',
      'no-restricted-syntax': [
        'error',
        ...arrowFunctionSelectors,
        ...reactCompilerSelectors,
      ],
    },
  },
  {
    files: ['apps/application-pwa/**/*.tsx'],
    ignores: ['**/*.hook.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        ...arrowFunctionSelectors,
        ...reactCompilerSelectors,
        ...viewLogicSelectors,
      ],
    },
  },
  prettier,
]
