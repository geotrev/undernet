const modules = {
  env: "@babel/preset-env",
  react: "@babel/preset-react",
  properties: "@babel/plugin-proposal-class-properties",
  dynamicImport: "@babel/plugin-syntax-dynamic-import",
  dynamicImportNode: "dynamic-import-node",
  aliases: "babel-plugin-webpack-aliases",
  emotion: "emotion",
}

module.exports = api => {
  const test = api.env("test")
  const cjs = api.env("cjs")
  const esm = api.env("esm")
  const rollup = api.env("rollup")

  let presets = [modules.env, modules.react]
  let plugins = [modules.properties, modules.dynamicImport, modules.emotion]

  if (test) {
    presets = [modules.react, [modules.env, { targets: { node: "current" } }]]
    plugins = [
      ...plugins,
      modules.dynamicImportNode,
      [modules.aliases, { config: "webpack.dev.js" }],
    ]
  } else if (cjs || rollup) {
    presets = [modules.env]
    plugins = []
  } else if (esm) {
    presets = [[modules.env, { modules: false }]]
    plugins = []
  }

  return { plugins, presets }
}
