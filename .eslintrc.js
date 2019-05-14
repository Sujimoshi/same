module.exports = {
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'project': './tsconfig.json'
  },
  'extends': [ 'standard', 'plugin:react/recommended' ],
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'plugins': [ '@typescript-eslint', 'react' ],
  'rules': {
    'no-unused-vars': 'off', // disable default rule, because it error on types
    '@typescript-eslint/no-unused-vars': 'error', // instead use this rule
  }
}
