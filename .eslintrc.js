module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  // add your custom rules here
  rules: {
      "indent": ["error", 4],
      "import/extensions": 0,
      "import/no-unresolved": ["off"],
      "array-callback-return": 0,
      "no-param-reassign": 0,
      "no-plusplus": [ "error", { "allowForLoopAfterthoughts": true }],
  },
  globals: {}
}
