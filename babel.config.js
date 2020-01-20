const modules = {
  env: "@babel/preset-env",
}

const libIgnore = ["src/js/**/__tests__", "src/js/index.bundle.js", "src/js/helpers/test"]

module.exports = api => {
  const test = api.env("test")
  const cjs = api.env("cjs")
  const esm = api.env("esm")
  const prod = api.env("production") // This is used for the production Jekyll build

  let presets = [modules.env]
  // let plugins = []
  let ignore = []

  if (test) {
    presets = [[modules.env, { targets: { node: "current" } }]]
  } else if (cjs || prod) {
    presets = [modules.env]
    ignore = [...libIgnore]
  } else if (esm) {
    presets = [[modules.env, { modules: false }]]
    ignore = [...libIgnore]
  }

  return { /* plugins, */ presets, ignore }
}
