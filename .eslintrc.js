module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    mocha: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",

    // framework
    Undernet: "writable",

    // tests
    should: "readonly",
    expect: "readonly",
    mount: "readyonly",
    shallow: "readyonly",
    chai: "readonly",
  },
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
  plugins: ["react"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "no-console": 0,
  },
}
