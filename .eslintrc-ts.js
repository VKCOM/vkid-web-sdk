module.exports = {
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  extends: ['@vkontakte/eslint-config/typescript'],
  plugins: ['eslint-plugin-import'],
  rules: {
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
        },
        'pathGroups': [
          {
            pattern: '#/**',
            group: 'internal',
          },
        ],
      },
    ],

    '@typescript-eslint/await-thenable': 'off',

    // Disabled because: no configurable options for .length > 0, arr[0] and similar constructions.
    'no-magic-numbers': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',

    // Disabled because: errors on 'displayMode || '5min'' expression with nullable variable.
    '@typescript-eslint/no-unnecessary-condition': 'off',

    // Disabled: covered with stricter tsc settings
    '@typescript-eslint/typedef': 'off',

    '@typescript-eslint/prefer-string-starts-ends-with': 'off',

    'no-shadow': 'off',
  },
};
