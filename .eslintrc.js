module.exports = {
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:sonarjs/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  rules: {
    'max-len': [
      'error',
      { code: 120, ignoreStrings: true },
    ],
    'react/function-component-definition': [2, { namedComponents: ['arrow-function', 'function-declaration'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    indent: ['error', 2],
    'no-multiple-empty-lines': ['error', { max: 3, maxBOF: 0, maxEOF: 0 }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-underscore-dangle': 0,
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'import/extensions': 0,
    'import/prefer-default-export': 0,
  },
};
