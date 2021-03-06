module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'max-len': [
      1,
      120,
      2,
      {
        ignoreComments: true
      }
    ],
    'react/prop-types': 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['error', 'always'],
    eqeqeq: ['warn', 'smart'],
    'no-trailing-spaces': ['warn'],
    'eol-last': ['error', 'always']
  }
};
