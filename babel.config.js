const basePresets = [
  ["@babel/preset-env", { useBuiltIns: "entry" }], 
  "@babel/preset-react"
]

const basePlugins = [
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-syntax-dynamic-import",
  "emotion",
]

const site = {
  presets: basePresets,
  plugins: basePlugins,
}

const test = {
  presets: basePresets,
  plugins: [
    "dynamic-import-node",
    ["babel-plugin-webpack-aliases", { config: "config/webpack.dev.js" }]
  ]
}

const dist = {
  presets: ["@babel/preset-env"],
}

module.exports = {
  env: {
    site,
    test,
    dist,
  },
}
