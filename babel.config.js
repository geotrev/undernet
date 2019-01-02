function presets(dist) {
  let result = ["@babel/preset-env"]

  if (!dist) {
    result.pop()
    result.push(["@babel/preset-env", { useBuiltIns: "entry" }], "@babel/preset-react")
  }

  return result
}

function plugins(options) {
  let result = [
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
  ]

  if (!options.dist) {
    result.push("@babel/plugin-syntax-dynamic-import", [
      "babel-plugin-webpack-aliases",
      { config: "config/webpack.dev.js" },
    ])

    if (options.test) result.push("dynamic-import-node")
    if (options.dev || options.prod) result.push("emotion")
  }

  return result
}

module.exports = {
  env: {
    dist: {
      presets: presets(true),
      plugins: plugins({ dist: true }),
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
