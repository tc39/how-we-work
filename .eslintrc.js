module.exports = {
  root: true,
  env: {
    browser: false,
    node: true,
    es2022: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true
    }
  },
  extends: ['eslint:recommended'],
};
