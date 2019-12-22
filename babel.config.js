const modules = {
  env: "@babel/preset-env",
  react: "@babel/preset-react",
  properties: "@babel/plugin-proposal-class-properties",
  dynamicImport: "@babel/plugin-syntax-dynamic-import",
  dynamicImportNode: "dynamic-import-node",
  emotion: "emotion",
}

const libIgnore = ["src/js/__tests__", "src/js/index.bundle.js"]

module.exports = api => {
  const test = api.env("test")
  const cjs = api.env("cjs")
  const esm = api.env("esm")

  let presets = [modules.env, modules.react]
  let plugins = [modules.properties, modules.dynamicImport, modules.emotion]
  let ignore = []

  if (test) {
    presets = [modules.react, [modules.env, { targets: { node: "current" } }]]
    plugins = [...plugins, modules.dynamicImportNode]
  } else if (cjs) {
    presets = [modules.env]
    plugins = []
    ignore = [...libIgnore]
  } else if (esm) {
    presets = [[modules.env, { modules: false }]]
    plugins = []
    ignore = [...libIgnore]
  }

  return { plugins, presets, ignore }
}
