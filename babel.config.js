let presets = ["@babel/preset-env", "@babel/preset-react"]
let plugins = [
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-syntax-dynamic-import",
  "emotion",
]

module.exports = api => {
  const test = api.env("test")
  const cjs = api.env("cjs")
  const esm = api.env("esm")
  const rollup = api.env("rollup")

  if (test) {
    presets = ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "current" } }]]
    plugins = [
      ...plugins,
      "dynamic-import-node",
      ["babel-plugin-webpack-aliases", { config: "webpack.dev.js" }],
    ]
  } else if (cjs || rollup) {
    presets = ["@babel/preset-env"]
    plugins = []
  } else if (esm) {
    presets = [["@babel/preset-env", { modules: false }]]
    plugins = []
  }

  return { plugins, presets }
}
