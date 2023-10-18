module.exports = {
  overrides: [{
    files: ['demo/**/*.ts', 'src/**/*.ts', '__tests__/**/*.ts'],
    extends: ['./.eslintrc-ts.js']
  }],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',
    // Allows for the use of imports
    ecmaFeatures: {
      restParams: true,
      spread: true
    }
  },
  globals: {
    process: true
  },
  extends: ["plugin:storybook/recommended", "plugin:storybook/recommended"]
};