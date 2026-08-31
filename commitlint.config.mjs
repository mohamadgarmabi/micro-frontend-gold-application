const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'perf',
        'style',
        'test',
        'docs',
        'build',
        'ops',
        'chore',
        'wip',
        'hotfix',
      ],
    ],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-case': [0],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [0],
  },
}

export default commitlintConfig
