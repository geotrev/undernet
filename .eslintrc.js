const ERROR = "error"
const READONLY = "readonly"

module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    babelOptions: {
      configFile: "babel.config.js",
    },
  },
  extends: ["plugin:react/recommended", "prettier", "prettier/react", "prettier/babel", "jsx-a11y"],
  plugins: ["react"],
  globals: {
    Atomics: READONLY,
    SharedArrayBuffer: READONLY,

    // framework
    Undernet: "writable",

    // tests
    should: READONLY,
    expect: READONLY,
    mount: READONLY,
    shallow: READONLY,
    chai: READONLY,
  },
  rules: {
    "for-direction": ERROR,
    "getter-return": ERROR,
    "no-async-promise-executor": ERROR,
    "no-await-in-loop": ERROR,
    "no-compare-neg-zero": ERROR,
    "no-cond-assign": [ERROR, "always"],
    "no-constant-condition": [ERROR, { checkLoops: true }],
    "no-debugger": ERROR,
    "no-dupe-args": ERROR,
    "no-dupe-keys": ERROR,
    "no-duplicate-case": ERROR,
    "no-ex-assign": ERROR,
    "no-extra-boolean-cast": ERROR,
    "no-func-assign": ERROR,
    "no-inner-declarations": ERROR,
    "no-obj-calls": ERROR,
    "no-irregular-whitespace": ERROR,
    "no-misleading-character-class": ERROR,
    "no-sparse-arrays": ERROR,
    "no-prototype-builtins": ERROR,
    "no-unexpected-multiline": ERROR,
    "no-unreachable": ERROR,
    "no-unsafe-finally": ERROR,
    "no-unsafe-negation": ERROR,
    "valid-typeof": ERROR,
    "use-isnan": ERROR,
    "require-atomic-updates": ERROR,

    // code style and formatting
    indent: [ERROR, 2],
    quotes: [ERROR, "double"],
    semi: [ERROR, "never"],
    "no-console": 0,
  },
}
