module.exports = {
  env: {
    browser: true,
    mocha: true,
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
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react",
    "prettier/babel",
  ],
  plugins: ["react"],
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
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "no-console": 0,
  },
}
