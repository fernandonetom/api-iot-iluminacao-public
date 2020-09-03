module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    camelcase: 'off',
    'max-len': 'off',
  },
};
