function presets(dist) {
  if (dist) {
    return ["@babel/preset-env"]
  }

  return [["@babel/preset-env", { useBuiltIns: "entry" }], "@babel/preset-react"]
}

function plugins(options) {
  let plugins = ["@babel/plugin-proposal-class-properties"]

  if (!options.dist) {
    plugins.push("@babel/plugin-syntax-dynamic-import", [
      "babel-plugin-webpack-aliases",
      { config: "config/webpack.dev.js" },
    ])

    if (options.test) plugins.push("dynamic-import-node")
    if (options.dev || options.prod) plugins.push("emotion")
  }

  return plugins
}

module.exports = {
  env: {
    dist: {
      presets: presets(true),
    },
    development: {
      presets: presets(),
      plugins: plugins({ dev: true }),
    },
    test: {
      presets: presets(),
      plugins: plugins({ test: true }),
    },
    production: {
      presets: presets(),
      plugins: plugins({ prod: true }),
    },
  },
}
