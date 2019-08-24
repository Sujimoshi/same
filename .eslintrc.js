module.exports = {
  'plugins': [ '@typescript-eslint', 'react' ],
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'extends': [ 'standard', 'plugin:react/recommended', 'plugin:prettier/recommended' ],
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'rules': {
    'no-unused-vars': 'off', // disable default rule, because it error on types
    '@typescript-eslint/no-unused-vars': 'off', // instead use this rule
    
    'no-useless-constructor': 'off',
    'max-lines': ["error", {"max": 200, "skipBlankLines": true, "skipComments": true }],
    'react/display-name': 'off',
    "complexity": ["error", 5],
    "no-return-assign": "off",
  }
}
