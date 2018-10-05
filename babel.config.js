function presets(rollup) {
  if (rollup) {
    return [["@babel/preset-env", { modules: false }]]
  } else {
    return ["@babel/preset-env", "@babel/preset-react"]
  }
}

function plugins(dev = false, test = false) {
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
      plugins: plugins((dev = true)),
    },
    test: {
      presets: presets(),
      plugins: plugins((test = true)),
    },
    production: {
      presets: presets(),
      plugins: plugins(),
    },
  },
}
