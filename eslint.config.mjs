import nx from '@nx/eslint-plugin'
import prettier from 'eslint-config-prettier'

const viewLogicSelectors = [
  {
    selector: 'FunctionDeclaration',
    message: 'Use const name = () => {}',
  },
  {
    selector: 'FunctionExpression',
    message: 'Use an arrow function',
  },
  {
    selector: "CallExpression[callee.name='useState']",
    message: 'Move useState into a *.hook.ts file',
  },
  {
    selector: "CallExpression[callee.name='useEffect']",
    message: 'Move useEffect into a *.hook.ts file',
  },
  {
    selector: "CallExpression[callee.name='useMemo']",
    message: 'Move useMemo into a *.hook.ts file',
  },
  {
    selector: "CallExpression[callee.name='useCallback']",
    message: 'Move useCallback into a *.hook.ts file',
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
    message: 'Use const name = () => {}',
  },
  {
    selector: 'FunctionExpression',
    message: 'Use an arrow function',
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
    },
  },
  {
    files: ['apps/application-pwa/**/*.ts'],
    ignores: ['**/*.d.ts'],
    rules: {
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'prefer-arrow-callback': 'error',
      'no-restricted-syntax': ['error', ...arrowFunctionSelectors],
    },
  },
  {
    files: ['apps/application-pwa/**/*.tsx'],
    ignores: ['**/*.hook.tsx'],
    rules: {
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'prefer-arrow-callback': 'error',
      'no-restricted-syntax': ['error', ...viewLogicSelectors],
    },
  },
  prettier,
]
