function presets(rollup) {
  if (rollup) {
    return [["@babel/preset-env", { modules: false }]]
  } else {
    return ["@babel/preset-env", "@babel/preset-react"]
  }
}

function plugins(dev, test) {
  var result = ["@babel/plugin-syntax-dynamic-import"]

  if (test) {
    result.push("dynamic-import-node")
  }

  if (dev || test) {
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
      plugins: plugins(true, false),
    },
    test: {
      presets: presets(),
      plugins: plugins(false, true),
    },
    production: {
      presets: presets(),
      plugins: plugins(),
    },
  },
}
