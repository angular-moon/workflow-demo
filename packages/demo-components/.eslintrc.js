// http://eslint.org/docs/user-guide/configuring
const path = require('path');

module.exports = {
  extends: ['airbnb'],
  parser: 'typescript-eslint-parser',
  parserOptions: {
    jsx: true,
    useJSXTextNode: true,
  },
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      'typescript-eslint-parser': ['.d.ts', '.ts', '.tsx'],
      webpack: {
        config: path.resolve(__dirname, 'config/webpack.config.dev.js'),
      },
    },
  },
  rules: {
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
    'react/forbid-foreign-prop-types': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': 'off',
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    'generator-star-spacing': 'off',
    'react/sort-comp': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/no-unused-prop-types': 'off',
    'array-callback-return': 'off',
    'no-confusing-arrow': 'off',
    'consistent-return': 'off',
    'react/require-default-props': 'off',
    'no-debugger': 'off',
    'no-plusplus': 'off',
    'flowtype/no-types-missing-file-annotation': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
  },
};
