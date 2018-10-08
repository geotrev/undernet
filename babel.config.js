function presets(rollup) {
  if (rollup) {
    return [["@babel/preset-env", { modules: false }]]
  } else {
    return ["@babel/preset-env", "@babel/preset-react"]
  }
}

function plugins(options) {
  let result = ["@babel/plugin-syntax-dynamic-import", "@babel/plugin-proposal-class-properties"]

  if (options.test) result.push("dynamic-import-node")

  if (options.dev || options.prod) result.push("emotion")

  if (options.dev || options.test) {
    result.push(["babel-plugin-webpack-aliases", { config: "config/webpack.dev.js" }])
  }

  return result
}

module.exports = {
  env: {
    rollup: {
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
