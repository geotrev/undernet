const path = require("path")

const ERROR = "error"
const READONLY = "readonly"
const OFF = "off"

const sitePath = path.resolve(__dirname, "site")
const srcPath = path.resolve(__dirname, "js/src")
const scriptsPath = path.resolve(__dirname, "scripts")
const nodeModulesPath = path.resolve(__dirname, "node_modules")
const webpackConfigPath = path.resolve(__dirname, "webpack.common.js")

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
  extends: [
    "plugin:react/recommended",
    "plugin:jsx-a11y/strict",
    "prettier",
    "prettier/react",
    "prettier/babel",
  ],
  plugins: ["react", "jsx-a11y"],
  globals: {
    Atomics: READONLY,
    SharedArrayBuffer: READONLY,

    // framework
    Undernet: "writable",

    // tests
    mount: READONLY,
    render: READONLY,
    shallow: READONLY,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js"],
        paths: [sitePath, srcPath, scriptsPath],
        moduleDirectory: [nodeModulesPath],
      },
      webpack: { config: webpackConfigPath },
    },
    "import/ignore": [".(scss|less|css|md)$"],
    react: {
      version: "detect",
    },
    linkComponents: [{ name: "Link", linkAttribute: "to" }],
  },
  rules: {
    // errors
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

    // best practices
    "accessor-pairs": ERROR,
    "array-callback-return": ERROR,
    "block-scoped-var": ERROR,
    "class-methods-use-this": OFF,
    complexity: OFF,
    "consistent-return": OFF,
    curly: OFF,
    "default-case": ERROR,
    "dot-location": OFF,
    "dot-notation": ERROR,
    eqeqeq: ERROR,
    "guard-for-in": ERROR,
    "max-classes-per-file": ERROR,
    "no-alert": OFF,
    "no-caller": ERROR,
    "no-case-declarations": ERROR,
    "no-div-regex": ERROR,
    "no-else-return": ERROR,
    "no-empty-function": OFF,
    "no-empty-pattern": ERROR,
    "no-eq-null": ERROR,
    "no-eval": ERROR,
    "no-extend-native": ERROR,
    "no-extra-bind": ERROR,
    "no-extra-label": OFF,
    "no-fallthrough": ERROR,
    "no-floating-decimal": ERROR,
    "no-global-assign": ERROR,
    "no-implicit-coercion": ERROR,
    "no-implicit-globals": ERROR,
    "no-implied-eval": ERROR,
    "no-invalid-this": OFF, // throws errors on class properties using fat arrow syntax
    "no-iterator": ERROR,
    "no-labels": ERROR,
    "no-lone-blocks": ERROR,
    "no-loop-func": ERROR,
    "no-magic-numbers": OFF,
    "no-multi-spaces": ERROR,
    "no-multi-str": ERROR,
    "no-new": ERROR,
    "no-new-func": ERROR,
    "no-new-wrappers": ERROR,
    "no-octal": ERROR,
    "no-octal-escape": ERROR,
    "no-param-reassign": ERROR,
    "no-proto": ERROR,
    "no-redeclare": OFF,
    "no-restricted-properties": OFF, // if undernet's api changes, this should become relevant
    "no-return-assign": ERROR,
    "no-return-await": ERROR,
    "no-script-url": ERROR,
    "no-self-assign": ERROR,
    "no-self-compare": ERROR,
    "no-sequences": ERROR,
    "no-throw-literal": ERROR,
    "no-unmodified-loop-condition": ERROR,
    "no-unused-expressions": ERROR,
    "no-unused-labels": OFF,
    "no-useless-call": ERROR,
    "no-useless-catch": ERROR,
    "no-useless-concat": ERROR,
    "no-useless-escape": ERROR,
    "no-useless-return": ERROR,
    "no-void": ERROR,
    "no-warning-comments": ERROR,
    "no-with": ERROR,
    "prefer-named-capture-group": OFF,
    "prefer-promise-reject-errors": ERROR,
    radix: OFF,
    "require-await": ERROR,
    "require-unicode-regexp": OFF,
    "vars-on-top": ERROR,
    "wrap-iife": ERROR,
    yoda: [ERROR, "never", { exceptRange: true }],

    // variables
    "init-delcarations": OFF,
    "no-delete-var": ERROR,
    "no-label-var": OFF,
    "no-restricted-globals": OFF,
    "no-shadow": ERROR,
    "no-shadow-restricted-names": ERROR,
    "no-undef": ERROR,
    "no-undef-init": ERROR,
    "no-undefined": OFF,
    "no-unused-vars": ERROR,
    "no-use-before-define": ERROR,
    "no-mixed-spaces-and-tabs": ERROR,

    // es6
    "arrow-parens": OFF,
    "arrow-spacing": ERROR,
    "constructor-super": ERROR,
    "no-class-assign": ERROR,
    "no-const-assign": ERROR,
    "no-dupe-class-members": ERROR,
    "no-duplicate-imports": ERROR,
    "no-new-symbol": ERROR,
    "no-this-before-super": ERROR,
    "no-useless-constructor": ERROR,
    "no-useless-rename": ERROR,
    "no-var": ERROR,
    "object-shorthand": [ERROR, "always"],
    "prefer-const": ERROR,
    "prefer-spread": ERROR,
    "prefer-template": ERROR,
    "require-yield": ERROR,

    // react
    "react/display-name": ERROR,

    // used for undernet only
    "no-console": OFF,
  },
}
